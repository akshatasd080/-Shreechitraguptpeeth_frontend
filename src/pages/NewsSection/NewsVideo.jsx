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
import { Plus, Edit2, Trash2, Video } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const VIDEO_BASE_URL = `${API_BASE_URL}/uploads/news-videos/`;

const emptyForm = {
  description: "",
  is_active: true,
  display_order: 0,
};

export default function AdminNewsVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "News Videos | Admin";
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news-videos");
      setVideos(res.data.videos || []);
    } catch {
      toast.error("Failed to fetch news videos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        description: item.description || "",
        is_active: item.is_active !== false,
        display_order: item.display_order ?? 0,
      });
      setVideoPreview(
        item.video_filename ? `${VIDEO_BASE_URL}${item.video_filename}` : null
      );
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, display_order: videos.length });
      setVideoPreview(null);
    }
    setVideoFile(null);
    setDialogOpen(true);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 80 * 1024 * 1024) {
      toast.error("Video must be less than 80MB");
      e.target.value = "";
      return;
    }
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && !videoFile) {
      toast.error("Please upload a video");
      return;
    }

    const data = new FormData();
    data.append("description", formData.description);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (videoFile) data.append("video", videoFile);

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/news-videos/${editing.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Video updated");
      } else {
        await api.post("/news-videos", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Video created");
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
    if (!window.confirm("Delete this video?")) return;
    try {
      await api.delete(`/news-videos/${id}`);
      toast.success("Video deleted");
      fetchVideos();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/news-videos/${item.id}`, { is_active: !item.is_active });
      toast.success(`Video ${!item.is_active ? "activated" : "deactivated"}`);
      fetchVideos();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = videos.filter((v) =>
    String(v.description || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">News Videos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload videos with description — monthly on public page
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
            <Plus className="mr-2 h-4 w-4" /> Add Video
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
            <Video className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No videos yet</h3>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Video
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
              <div className="h-40 bg-black">
                {item.video_filename && (
                  <video
                    src={`${VIDEO_BASE_URL}${item.video_filename}`}
                    className="h-full w-full object-cover"
                    muted
                    preload="metadata"
                  />
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between gap-2">
                  <CardTitle className="text-base line-clamp-2">
                    {item.description || "No description"}
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
              <CardContent className="flex justify-end gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Video" : "Add Video"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
              <Label>Video {!editing && "*"}</Label>
              <Input
                type="file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                onChange={handleVideoChange}
              />
              <p className="text-xs text-muted-foreground">
                MP4 / WEBM / MOV — max 80MB
              </p>
              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
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
