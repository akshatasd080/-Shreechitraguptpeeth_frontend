import React, { useEffect, useMemo, useState } from "react";
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
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/spiritual/`;

const TYPE_OPTIONS = [
  { value: "mantra", label: "🕉 Mantra" },
  { value: "aarti", label: "🙏 Aarti" },
  { value: "chalisa", label: "📖 Chalisa" },
  { value: "sunRise", label: "🌞 Sun Rise" },
  { value: "moonRise", label: "🌙 Moon Rise" },
];

const emptyForm = {
  type: "mantra",
  category: "",
  name: "",
  content: "",
  is_active: true,
  display_order: 0,
};

export default function Mantras() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    document.title = "Mantras | Admin";
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await api.get("/spiritual-resources");
      setResources(res.data.resources || []);
    } catch (_) {
      toast.error("Failed to fetch spiritual resources");
    } finally {
      setLoading(false);
    }
  };

  const existingCategories = useMemo(() => {
    const type = formData.type;
    const cats = resources
      .filter((r) => r.type === type)
      .map((r) => r.category)
      .filter(Boolean);
    return [...new Set(cats)].sort();
  }, [resources, formData.type]);

  const handleOpenDialog = (resource = null) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        type: resource.type || "mantra",
        category: resource.category || "",
        name: resource.name || "",
        content: resource.content || "",
        is_active: resource.is_active !== false,
        display_order: resource.display_order ?? 0,
      });
      setImagePreview(
        resource.image_filename
          ? `${IMAGE_BASE_URL}${resource.image_filename}`
          : null
      );
    } else {
      setEditingResource(null);
      setFormData({
        ...emptyForm,
        display_order: resources.length,
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
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.category.trim()) {
      toast.error("Category is required");
      return;
    }

    const data = new FormData();
    data.append("type", formData.type);
    data.append("category", formData.category.trim());
    data.append("name", formData.name.trim());
    data.append("content", formData.content);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      if (editingResource) {
        await api.put(`/spiritual-resources/${editingResource.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Resource updated successfully");
      } else {
        await api.post("/spiritual-resources", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Resource created successfully");
      }
      setDialogOpen(false);
      fetchResources();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    try {
      await api.delete(`/spiritual-resources/${id}`);
      toast.success("Resource deleted successfully");
      fetchResources();
    } catch (_) {
      toast.error("Failed to delete resource");
    }
  };

  const handleToggleActive = async (resource) => {
    try {
      await api.put(`/spiritual-resources/${resource.id}`, {
        is_active: !resource.is_active,
      });
      toast.success(
        `Resource ${!resource.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchResources();
    } catch (_) {
      toast.error("Failed to update status");
    }
  };

  const getTypeLabel = (type) =>
    TYPE_OPTIONS.find((t) => t.value === type)?.label || type;

  const filtered = resources.filter((r) => {
    if (filterType !== "all" && r.type !== filterType) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(r.name || "").toLowerCase().includes(q) ||
      String(r.category || "").toLowerCase().includes(q) ||
      String(r.type || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mantras & Spiritual Resources</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            Add categories, types, mantra names and images for the homepage
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 rounded-md border border-input bg-white dark:bg-slate-800 px-3 text-sm"
          >
            <option value="all">All Types</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 bg-white dark:bg-slate-800 dark:border-slate-700"
          />
          <Button onClick={() => handleOpenDialog()} className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
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
            <h3 className="text-lg font-semibold">No resources found</h3>
            <p className="text-muted-foreground mb-6">
              Add your first mantra, aarti or chalisa for the homepage.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <Card
              key={resource.id}
              className={`overflow-hidden dark:bg-slate-900 dark:border-slate-700 ${
                !resource.is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative h-40 bg-muted dark:bg-slate-800">
                {resource.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${resource.image_filename}`}
                    alt={resource.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-10 w-10" />
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {getTypeLabel(resource.type)}
                </span>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-orange-600 font-medium mb-1">
                      {resource.category}
                    </p>
                    <CardTitle className="text-lg line-clamp-2">
                      {resource.name}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 rounded-full border dark:border-slate-700 px-2.5 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {resource.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={resource.is_active}
                      onCheckedChange={() => handleToggleActive(resource)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(resource)}
                    className="flex-1"
                  >
                    <Edit2 className="mr-1 h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto dark:bg-slate-900">
          <DialogHeader>
            <DialogTitle>
              {editingResource ? "Edit Resource" : "Add Resource"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Type *</Label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="mt-1 w-full h-10 rounded-md border border-input bg-white dark:bg-slate-800 px-3 text-sm"
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Category *</Label>
              <Input
                list="category-suggestions"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g. Om Mantra, Shiv Mantras"
                className="mt-1 dark:bg-slate-800"
              />
              <datalist id="category-suggestions">
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>

            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Radha Mantra, Om Namah Shivaya"
                className="mt-1 dark:bg-slate-800"
              />
            </div>

            <div>
              <Label>Content (HTML)</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Mantra text, meaning, benefits..."
                rows={6}
                className="mt-1 dark:bg-slate-800 font-mono text-sm"
              />
            </div>

            <div>
              <Label>Image</Label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                className="mt-1 dark:bg-slate-800"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded-lg border"
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: Number(e.target.value),
                    })
                  }
                  className="mt-1 dark:bg-slate-800"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Checkbox
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: Boolean(checked) })
                  }
                />
                <Label>Active</Label>
              </div>
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
                {saving ? "Saving..." : editingResource ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
