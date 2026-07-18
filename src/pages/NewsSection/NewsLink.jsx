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
import { Plus, Edit2, Trash2, Link2, ExternalLink } from "lucide-react";

const LINK_TYPES = ["video", "reel", "link"];

const emptyForm = {
  title: "",
  url: "",
  description: "",
  link_type: "video",
  is_active: true,
  display_order: 0,
};

export default function AdminNewsLink() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "News Links | Admin";
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news-links");
      setLinks(res.data.links || []);
    } catch {
      toast.error("Failed to fetch news links");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        title: item.title || "",
        url: item.url || "",
        description: item.description || "",
        link_type: item.link_type || "video",
        is_active: item.is_active !== false,
        display_order: item.display_order ?? 0,
      });
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, display_order: links.length });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.url.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formData.title.trim(),
        url: formData.url.trim(),
        description: formData.description,
        link_type: formData.link_type,
        is_active: formData.is_active,
        display_order: formData.display_order,
      };
      if (editing) {
        await api.put(`/news-links/${editing.id}`, payload);
        toast.success("Link updated");
      } else {
        await api.post("/news-links", payload);
        toast.success("Link created");
      }
      setDialogOpen(false);
      fetchLinks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await api.delete(`/news-links/${id}`);
      toast.success("Link deleted");
      fetchLinks();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/news-links/${item.id}`, { is_active: !item.is_active });
      toast.success(`Link ${!item.is_active ? "activated" : "deactivated"}`);
      fetchLinks();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = links.filter((l) => {
    const q = search.toLowerCase();
    return (
      String(l.title || "")
        .toLowerCase()
        .includes(q) ||
      String(l.description || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">News Links</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add Facebook / news links for the public News Links page
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
            <Plus className="mr-2 h-4 w-4" /> Add Link
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
            <Link2 className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No links yet</h3>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Link
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className={!item.is_active ? "opacity-70" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">
                    {item.title}
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
                <p className="text-xs text-muted-foreground capitalize">
                  Type: {item.link_type}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {item.description || "No description"}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-4 break-all"
                >
                  <ExternalLink className="h-3 w-3 shrink-0" />
                  {item.url}
                </a>
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
            <DialogTitle>{editing ? "Edit Link" : "Add Link"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>URL *</Label>
              <Input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, url: e.target.value }))
                }
                placeholder="https://www.facebook.com/..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <select
                  value={formData.link_type}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, link_type: e.target.value }))
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {LINK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  min={0}
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      display_order: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(c) =>
                  setFormData((p) => ({ ...p, is_active: c === true }))
                }
              />
              <Label htmlFor="is_active">Active</Label>
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
