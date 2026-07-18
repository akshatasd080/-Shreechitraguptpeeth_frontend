import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/pooja/`;

const DAY_OPTIONS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Everyday",
];

const DURATION_OPTIONS = [
  "45 Mins",
  "1 Hour",
  "2 Hours",
  "3 Hours",
  "1 Day",
  "2 Days",
  "3 Days",
];

const emptyForm = {
  title: "",
  description: "",
  day: "Everyday",
  duration: "1 Hour",
  is_active: true,
  display_order: 0,
};

export default function Pooja() {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPooja, setEditingPooja] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Pooja | Admin";
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    setLoading(true);
    try {
      const res = await api.get("/poojas");
      setPoojas(res.data.poojas || []);
    } catch (err) {
      toast.error("Failed to fetch poojas");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (pooja = null) => {
    if (pooja) {
      setEditingPooja(pooja);
      setFormData({
        title: pooja.title || "",
        description: pooja.description || "",
        day: pooja.day || "Everyday",
        duration: pooja.duration || "1 Hour",
        is_active: pooja.is_active !== false,
        display_order: pooja.display_order ?? 0,
      });
      setImagePreview(
        pooja.image_filename
          ? `${IMAGE_BASE_URL}${pooja.image_filename}`
          : null
      );
    } else {
      setEditingPooja(null);
      setFormData({
        ...emptyForm,
        display_order: poojas.length,
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
      toast.error("Title is required");
      return;
    }
    if (!editingPooja && !imageFile) {
      toast.error("Please upload a pooja image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description);
    data.append("day", formData.day);
    data.append("duration", formData.duration);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      if (editingPooja) {
        await api.put(`/poojas/${editingPooja.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Pooja updated successfully");
      } else {
        await api.post("/poojas", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Pooja created successfully");
      }
      setDialogOpen(false);
      fetchPoojas();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pooja?")) return;
    try {
      await api.delete(`/poojas/${id}`);
      toast.success("Pooja deleted successfully");
      fetchPoojas();
    } catch (err) {
      toast.error("Failed to delete pooja");
    }
  };

  const handleToggleActive = async (pooja) => {
    try {
      await api.put(`/poojas/${pooja.id}`, {
        is_active: !pooja.is_active,
      });
      toast.success(
        `Pooja ${!pooja.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchPoojas();
    } catch (err) {
      toast.error("Failed to update pooja status");
    }
  };

  const filtered = poojas.filter((p) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(p.title || "")
        .toLowerCase()
        .includes(q) ||
      String(p.description || "")
        .toLowerCase()
        .includes(q) ||
      String(p.day || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pooja Booking</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            Add and manage homepage pooja cards
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search poojas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 bg-white dark:bg-slate-800 dark:border-slate-700"
          />
          <Button onClick={() => handleOpenDialog()} className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Pooja
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
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No poojas found</h3>
            <p className="text-muted-foreground mb-6">
              Create your first pooja to show on the homepage.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Pooja
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pooja) => (
            <Card
              key={pooja.id}
              className={`overflow-hidden dark:bg-slate-900 dark:border-slate-700 ${
                !pooja.is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative h-40 bg-muted dark:bg-slate-800">
                {pooja.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${pooja.image_filename}`}
                    alt={pooja.title}
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
                  <CardTitle className="text-lg line-clamp-2">
                    {pooja.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0 rounded-full border dark:border-slate-700 px-2.5 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {pooja.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={!!pooja.is_active}
                      onCheckedChange={() => handleToggleActive(pooja)}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {pooja.day} · {pooja.duration} · Order: {pooja.display_order}
                </p>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
                  {pooja.description || "No description"}
                </p>
              </CardContent>

              <div className="px-6 py-3 border-t dark:border-slate-700 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(pooja)}
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(pooja.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPooja ? "Edit Pooja" : "Add Pooja"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Pooja title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Pooja description"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="day">Day *</Label>
                <select
                  id="day"
                  value={formData.day}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, day: e.target.value }))
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  required
                >
                  {DAY_OPTIONS.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <select
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  required
                >
                  {DURATION_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
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
              <Label htmlFor="image">Image {!editingPooja && "*"}</Label>
              <Input
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG, WEBP — max 5MB
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
              <Label htmlFor="is_active">Active (show on homepage)</Label>
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
                  : editingPooja
                    ? "Update Pooja"
                    : "Create Pooja"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
