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

export default function YouTubevideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "YouTube Videos | Admin";
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/youtube-videos");
      setVideos(res.data.videos || []);
    } catch (err) {
      toast.error("Failed to fetch YouTube videos");
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

    setSaving(true);
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description,
        youtube_url: formData.youtube_url.trim(),
        is_active: formData.is_active,
        display_order: formData.display_order,
      };

      if (editingVideo) {
        await api.put(`/youtube-videos/${editingVideo.id}`, payload);
        toast.success("Video updated successfully");
      } else {
        await api.post("/youtube-videos", payload);
        toast.success("Video created successfully");
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
    if (!window.confirm("Delete this YouTube video?")) return;
    try {
      await api.delete(`/youtube-videos/${id}`);
      toast.success("Video deleted successfully");
      fetchVideos();
    } catch (err) {
      toast.error("Failed to delete video");
    }
  };

  const handleToggleActive = async (video) => {
    try {
      await api.put(`/youtube-videos/${video.id}`, {
        is_active: !video.is_active,
      });
      toast.success(
        `Video ${!video.is_active ? "activated" : "deactivated"} successfully`
      );
      fetchVideos();
    } catch (err) {
      toast.error("Failed to update video status");
    }
  };

  const filtered = videos.filter((v) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(v.title || "")
        .toLowerCase()
        .includes(q) ||
      String(v.description || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">YouTube Videos</h1>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
            Homepage shows the latest 6 active videos
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
            <h3 className="text-lg font-semibold">No YouTube videos found</h3>
            <p className="text-muted-foreground mb-6">
              Add your first video to show on the homepage gallery.
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
              className={`overflow-hidden dark:bg-slate-900 dark:border-slate-700 ${
                !video.is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative h-44 bg-muted dark:bg-slate-800">
                <iframe
                  src={video.youtube_url}
                  title={video.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {video.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0 rounded-full border dark:border-slate-700 px-2.5 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {video.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={!!video.is_active}
                      onCheckedChange={() => handleToggleActive(video)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
                  {video.description || "No description"}
                </p>
              </CardContent>

              <div className="px-6 py-3 border-t dark:border-slate-700 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(video)}
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(video.id)}
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
              {editingVideo ? "Edit YouTube Video" : "Add YouTube Video"}
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
                placeholder="Video title"
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
                placeholder="Video description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube Link *</Label>
              <Input
                id="youtube_url"
                value={formData.youtube_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    youtube_url: e.target.value,
                  }))
                }
                placeholder="https://www.youtube.com/watch?v=... or youtu.be/..."
                required
              />
              <p className="text-xs text-muted-foreground">
                Paste any YouTube watch, share, shorts, or embed link
              </p>
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
                  : editingVideo
                    ? "Update Video"
                    : "Create Video"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
