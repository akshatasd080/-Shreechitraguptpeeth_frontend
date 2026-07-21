import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Plus, Edit2, Trash2, Image as ImageIcon, Images } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/gallery/`;

const emptyForm = {
  title: "",
  is_active: true,
  display_order: 0,
};

export default function GalleryImageAdmin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Gallery Images | Admin";
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await api.get("/gallery-images");
      setImages(res.data.images || []);
    } catch (_) {
      toast.error("Failed to fetch gallery images");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (image = null) => {
    if (image) {
      setEditingImage(image);
      setFormData({
        title: image.title || "",
        is_active: image.is_active !== false,
        display_order: image.display_order ?? 0,
      });
      setImagePreview(
        image.image_filename
          ? `${IMAGE_BASE_URL}${image.image_filename}`
          : null
      );
    } else {
      setEditingImage(null);
      setFormData({
        ...emptyForm,
        display_order: images.length,
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG and WEBP images are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter image title");
      return;
    }
    if (!editingImage && !imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      if (editingImage) {
        await api.put(`/gallery-images/${editingImage.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery image updated successfully");
      } else {
        await api.post("/gallery-images", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Gallery image created successfully");
      }
      setDialogOpen(false);
      fetchImages();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    try {
      await api.delete(`/gallery-images/${id}`);
      toast.success("Gallery image deleted successfully");
      fetchImages();
    } catch (_) {
      toast.error("Failed to delete gallery image");
    }
  };

  const handleToggleActive = async (image) => {
    try {
      await api.put(`/gallery-images/${image.id}`, {
        is_active: !image.is_active,
      });
      toast.success(
        `Image ${!image.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchImages();
    } catch (_) {
      toast.error("Failed to update image status");
    }
  };

  const filtered = images.filter((img) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return String(img.title || "")
      .toLowerCase()
      .includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gallery Images</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            Upload photo gallery images that appear on the public gallery page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 bg-white dark:bg-slate-800 dark:border-slate-700"
          />
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-primary text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-12 w-12" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="dark:bg-slate-900 dark:border-slate-700">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted dark:bg-slate-800 rounded-full p-4 mb-4">
              <Images className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No gallery images found</h3>
            <p className="text-muted-foreground mb-6">
              Upload your first gallery image to get started.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((image) => (
            <Card
              key={image.id}
              className={`overflow-hidden dark:bg-slate-900 dark:border-slate-700 ${
                !image.is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative h-44 bg-muted dark:bg-slate-800">
                {image.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${image.image_filename}`}
                    alt={image.title || "Gallery"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">
                    {image.title || "Untitled image"}
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0 rounded-full border dark:border-slate-700 px-2.5 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {image.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={!!image.is_active}
                      onCheckedChange={() => handleToggleActive(image)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-3 pt-0">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(image)}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(image.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingImage ? "Edit Gallery Image" : "Add Gallery Image"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Image title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min={0}
                value={formData.display_order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    display_order: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image {!editingImage && "*"}</Label>
              <Input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG, WEBP, max 5MB.
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-cover rounded-md border"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_active: checked === true,
                  }))
                }
              />
              <Label htmlFor="is_active">Active (show on photo gallery page)</Label>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingImage
                    ? "Update Image"
                    : "Create Image"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
