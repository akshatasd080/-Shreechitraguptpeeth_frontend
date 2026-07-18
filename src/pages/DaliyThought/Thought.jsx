import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Plus, Edit2, Trash2, Lightbulb, Image as ImageIcon } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/thoughts/`;

const todayStr = () => {
  const d = new Date();
  return d.toISOString().slice(0, 10);
};

const emptyForm = {
  thought_hi: "",
  thought_en: "",
  thought_date: todayStr(),
  is_active: true,
  display_order: 0,
};

export default function Thought() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Daily Thought | Admin";
    fetchThoughts();
  }, []);

  const fetchThoughts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/daily-thoughts");
      setThoughts(res.data.thoughts || []);
    } catch {
      toast.error("Failed to fetch daily thoughts");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        thought_hi: item.thought_hi || "",
        thought_en: item.thought_en || "",
        thought_date: item.thought_date || todayStr(),
        is_active: item.is_active !== false,
        display_order: item.display_order ?? 0,
      });
      setImagePreview(
        item.image_filename
          ? `${IMAGE_BASE_URL}${item.image_filename}`
          : null
      );
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, thought_date: todayStr() });
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
    if (!formData.thought_hi.trim()) {
      toast.error("Hindi thought is required");
      return;
    }
    if (!formData.thought_date) {
      toast.error("Date is required");
      return;
    }
    if (!editing && !imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append("thought_hi", formData.thought_hi.trim());
    data.append("thought_en", formData.thought_en.trim());
    data.append("thought_date", formData.thought_date);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/daily-thoughts/${editing.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Thought updated");
      } else {
        await api.post("/daily-thoughts", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Thought created");
      }
      setDialogOpen(false);
      fetchThoughts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this thought?")) return;
    try {
      await api.delete(`/daily-thoughts/${id}`);
      toast.success("Thought deleted");
      fetchThoughts();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/daily-thoughts/${item.id}`, {
        is_active: !item.is_active,
      });
      toast.success(
        `Thought ${!item.is_active ? "activated" : "deactivated"}`
      );
      fetchThoughts();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = thoughts.filter((t) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(t.thought_hi || "")
        .toLowerCase()
        .includes(q) ||
      String(t.thought_en || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Daily Thought</h1>
          <p className="text-sm text-muted-foreground mt-1">
            आज का विचार — Hindi & English text with image for Home page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Thought
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-12 w-12" />
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-16 text-center">
            <Lightbulb className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No thoughts yet</h3>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Thought
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden ${!item.is_active ? "opacity-70" : ""}`}
            >
              <div className="h-40 bg-muted">
                {item.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${item.image_filename}`}
                    alt="Thought"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between gap-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.thought_date}
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase">
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={!!item.is_active}
                      onCheckedChange={() => handleToggleActive(item)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-3 mb-2">{item.thought_hi}</p>
                {item.thought_en && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {item.thought_en}
                  </p>
                )}
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
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
              {editing ? "Edit Thought" : "Add Daily Thought"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={formData.thought_date}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, thought_date: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Thought (Hindi) *</Label>
              <Textarea
                rows={4}
                value={formData.thought_hi}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, thought_hi: e.target.value }))
                }
                placeholder="आज का विचार हिंदी में..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Thought (English)</Label>
              <Textarea
                rows={4}
                value={formData.thought_en}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, thought_en: e.target.value }))
                }
                placeholder="Today's thought in English..."
              />
            </div>
            <div className="space-y-2">
              <Label>Image {!editing && "*"}</Label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
              />
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
                onCheckedChange={(c) =>
                  setFormData((p) => ({ ...p, is_active: c === true }))
                }
              />
              <Label htmlFor="is_active">Active (show on homepage)</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
