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
import { Plus, Edit2, Trash2, Calendar, Image as ImageIcon } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3004/api";
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/events/`;

const emptyForm = {
  title: "",
  description: "",
  event_time: "",
  location: "",
  event_date: "",
  event_type: "upcoming",
  is_active: true,
  display_order: 0,
};

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    document.title = "Events | Admin";
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditing(item);
      setFormData({
        title: item.title || "",
        description: item.description || "",
        event_time: item.event_time || "",
        location: item.location || "",
        event_date: item.event_date || "",
        event_type: item.event_type || "upcoming",
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
      setFormData({ ...emptyForm, display_order: events.length });
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
    if (!formData.event_date) {
      toast.error("Date is required");
      return;
    }
    if (!editing && !imageFile) {
      toast.error("Please upload an image");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description);
    data.append("event_time", formData.event_time);
    data.append("location", formData.location);
    data.append("event_date", formData.event_date);
    data.append("event_type", formData.event_type);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/events/${editing.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event updated");
      } else {
        await api.post("/events", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Event created");
      }
      setDialogOpen(false);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted");
      fetchEvents();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await api.put(`/events/${item.id}`, { is_active: !item.is_active });
      toast.success(`Event ${!item.is_active ? "activated" : "deactivated"}`);
      fetchEvents();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = events.filter((ev) => {
    if (filterType !== "all" && ev.event_type !== filterType) return false;
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      String(ev.title || "")
        .toLowerCase()
        .includes(q) ||
      String(ev.description || "")
        .toLowerCase()
        .includes(q) ||
      String(ev.location || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Events</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add Past / Upcoming events. Upcoming dates that pass move to Past
            automatically.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
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
            <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events yet</h3>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Event
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
              <div className="relative h-40 bg-muted">
                {item.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${item.image_filename}`}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <span
                  className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full text-white ${
                    item.event_type === "upcoming"
                      ? "bg-green-600"
                      : "bg-gray-600"
                  }`}
                >
                  {item.event_type}
                </span>
              </div>
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
                <p className="text-xs text-muted-foreground">
                  {item.event_date}
                  {item.event_time ? ` · ${item.event_time}` : ""}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                  {item.description || "No description"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {item.location || "No location"}
                </p>
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
            <DialogTitle>{editing ? "Edit Event" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Event Type *</Label>
              <select
                value={formData.event_type}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, event_type: e.target.value }))
                }
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                required
              >
                <option value="upcoming">Upcoming Event</option>
                <option value="past">Past Event</option>
              </select>
            </div>

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
                <Label>Date *</Label>
                <Input
                  type="date"
                  value={formData.event_date}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, event_date: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  value={formData.event_time}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, event_time: e.target.value }))
                  }
                  placeholder="09:00 AM - 05:00 PM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="Shree Chitragupt Peeth, Vrindavan"
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
              <Label htmlFor="is_active">Active (show on events page)</Label>
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
