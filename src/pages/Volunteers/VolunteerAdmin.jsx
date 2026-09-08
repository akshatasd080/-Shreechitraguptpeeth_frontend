import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Image as ImageIcon, Plus, Trash2, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

const API_BASE_URL = (
  import.meta.env.VITE_BASE_URL || "http://localhost:3011/api"
).replace(/\/+$/, "");
const IMAGE_BASE_URL = `${API_BASE_URL}/uploads/volunteers/`;

const emptyForm = {
  name: "",
  role: "",
  location: "",
  mobile: "",
  display_order: 0,
  is_active: true,
};

export default function VolunteerAdmin() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [search, setSearch] = useState("");

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/volunteers");
      setVolunteers(response.data.volunteers || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch volunteers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Volunteers | Admin";
    fetchVolunteers();
  }, []);

  const openDialog = (volunteer = null) => {
    if (volunteer) {
      setEditing(volunteer);
      setFormData({
        name: volunteer.name || "",
        role: volunteer.role || "",
        location: volunteer.location || "",
        mobile: volunteer.mobile || "",
        display_order: volunteer.display_order ?? 0,
        is_active: volunteer.is_active !== false,
      });
      setImagePreview(
        volunteer.image_filename
          ? `${IMAGE_BASE_URL}${volunteer.image_filename}`
          : null
      );
    } else {
      setEditing(null);
      setFormData({ ...emptyForm, display_order: volunteers.length });
      setImagePreview(null);
    }
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG and WEBP images are allowed");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = [
      ["name", "Name"],
      ["role", "Role"],
      ["location", "Location"],
      ["mobile", "Mobile number"],
    ];
    const missing = requiredFields.find(([field]) => !formData[field].trim());
    if (missing) {
      toast.error(`${missing[1]} is required`);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (imageFile) data.append("image", imageFile);

    setSaving(true);
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (editing) {
        await api.put(`/volunteers/${editing.id}`, data, config);
        toast.success("Volunteer updated successfully");
      } else {
        await api.post("/volunteers", data, config);
        toast.success("Volunteer added successfully");
      }
      setDialogOpen(false);
      await fetchVolunteers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save volunteer");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (volunteer) => {
    if (!window.confirm(`Delete ${volunteer.name}?`)) return;
    try {
      await api.delete(`/volunteers/${volunteer.id}`);
      toast.success("Volunteer deleted successfully");
      fetchVolunteers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete volunteer");
    }
  };

  const handleToggleActive = async (volunteer) => {
    try {
      await api.put(`/volunteers/${volunteer.id}`, {
        is_active: !volunteer.is_active,
      });
      toast.success(
        `Volunteer ${!volunteer.is_active ? "activated" : "deactivated"}`
      );
      fetchVolunteers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return volunteers;
    return volunteers.filter((volunteer) =>
      [volunteer.name, volunteer.role, volunteer.location, volunteer.mobile]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search, volunteers]);

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Volunteers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add and manage volunteers shown on the public Volunteers page.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search volunteers..."
            className="sm:w-64"
          />
          <Button onClick={() => openDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Volunteer
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
            <Users className="h-10 w-10 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">No volunteers found</h2>
            <Button onClick={() => openDialog()}>
              <Plus className="mr-2 h-4 w-4" /> Add Volunteer
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((volunteer) => (
            <Card
              key={volunteer.id}
              className={`overflow-hidden ${
                !volunteer.is_active ? "opacity-65" : ""
              }`}
            >
              <div className="h-44 bg-muted flex items-center justify-center">
                {volunteer.image_filename ? (
                  <img
                    src={`${IMAGE_BASE_URL}${volunteer.image_filename}`}
                    alt={volunteer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between gap-3">
                  <div>
                    <CardTitle className="text-lg">{volunteer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {volunteer.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase">
                      {volunteer.is_active ? "Active" : "Inactive"}
                    </span>
                    <Checkbox
                      checked={!!volunteer.is_active}
                      onCheckedChange={() => handleToggleActive(volunteer)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {volunteer.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {volunteer.mobile}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Display order: {volunteer.display_order}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDialog(volunteer)}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(volunteer)}
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
              {editing ? "Edit Volunteer" : "Add Volunteer"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["name", "Name", "Volunteer name"],
              ["role", "Role / Designation", "Team member, coordinator..."],
              ["location", "Location", "City, state or peeth"],
              ["mobile", "Mobile Number", "+91-XXXXXXXXXX"],
            ].map(([field, label, placeholder]) => (
              <div className="space-y-2" key={field}>
                <Label htmlFor={field}>{label} *</Label>
                <Input
                  id={field}
                  value={formData[field]}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      [field]: event.target.value,
                    }))
                  }
                  placeholder={placeholder}
                  required
                />
              </div>
            ))}

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min={0}
                step={1}
                value={formData.display_order}
                onChange={(event) =>
                  setFormData((previous) => ({
                    ...previous,
                    display_order: Number(event.target.value),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volunteer-image">
                Photo {editing ? "" : "(optional)"}
              </Label>
              <Input
                id="volunteer-image"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                PNG, JPG, JPEG or WEBP, maximum 5MB
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Volunteer preview"
                  className="h-40 w-full rounded-md border object-cover"
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData((previous) => ({
                    ...previous,
                    is_active: checked === true,
                  }))
                }
              />
              <Label htmlFor="is_active">
                Active (show on public Volunteers page)
              </Label>
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
                {saving ? "Saving..." : editing ? "Update" : "Add Volunteer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
