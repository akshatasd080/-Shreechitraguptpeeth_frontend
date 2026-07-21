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
import { Plus, Edit2, Trash2, Youtube } from "lucide-react";

const emptyForm = {
  title: "",
  description: "",
  youtube_url: "",
  is_active: true,
  display_order: 0,
};

export default function GalleryVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Gallery Videos | Admin";
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/gallery-videos");
      setVideos(res.data.videos || []);
    } catch {
      toast.error("Failed to fetch gallery videos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (video = null) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title || "",
        description: video.description || "",
        youtube_url: video.youtube_url || "",
        is_active: video.is_active !== false,
        display_order: video.display_order ?? 0,
      });
    } else {
      setEditingVideo(null);
      setFormData({
        ...emptyForm,
        display_order: videos.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formData.youtube_url.trim()) {
      toast.error("YouTube link is required");
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description,
      youtube_url: formData.youtube_url.trim(),
      is_active: formData.is_active,
      display_order: formData.display_order,
    };

    setSaving(true);
    try {
      if (editingVideo) {
        await api.put(`/gallery-videos/${editingVideo.id}`, payload);
        toast.success("Gallery video updated successfully");
      } else {
        await api.post("/gallery-videos", payload);
        toast.success("Gallery video created successfully");
      }
      setDialogOpen(false);
      fetchVideos();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery video?")) return;
    try {
      await api.delete(`/gallery-videos/${id}`);
      toast.success("Gallery video deleted successfully");
      fetchVideos();
    } catch {
      toast.error("Failed to delete gallery video");
    }
  };

  const handleToggleActive = async (video) => {
    try {
      await api.put(`/gallery-videos/${video.id}`, {
        is_active: !video.is_active,
      });
      toast.success(
        `Video ${!video.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchVideos();
    } catch {
      toast.error("Failed to update video status");
    }
  };

  const filtered = videos.filter((video) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(video.title || "")
        .toLowerCase()
        .includes(q) ||
      String(video.description || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gallery Videos</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            Manage video gallery content for the public video gallery page
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 bg-white dark:bg-slate-800 dark:border-slate-700"
          />
          <Button onClick={() => handleOpenDialog()} className="bg-primary text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Video
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
              <Youtube className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No gallery videos found</h3>
            <p className="text-muted-foreground mb-6">
              Add your first gallery video for the public video gallery.
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden dark:bg-slate-900 dark:border-slate-700"
            >
              <div className="aspect-video overflow-hidden bg-black rounded-t-xl">
                <iframe
                  src={video.youtube_url}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-2">
                      Order: {video.display_order ?? 0}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(video)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      video.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {video.is_active ? "Active" : "Inactive"}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {video.description ? (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {video.description}
                  </p>
                ) : null}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleOpenDialog(video)}
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleDelete(video.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl dark:bg-slate-950 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle>
              {editingVideo ? "Edit Gallery Video" : "Add Gallery Video"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Video Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter video title"
              />
            </div>

            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input
                value={formData.youtube_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    youtube_url: e.target.value,
                  }))
                }
                placeholder="Paste YouTube link"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter description (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    display_order: Number(e.target.value),
                  }))
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="gallery-video-active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_active: !!checked }))
                }
              />
              <Label htmlFor="gallery-video-active">Active</Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-primary text-white">
                {saving ? "Saving..." : editingVideo ? "Update Video" : "Create Video"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
