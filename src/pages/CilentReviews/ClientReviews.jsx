import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Star, Trash2, Edit2, Plus, Settings } from "lucide-react";
import ReorderDialog from "@/components/common/ReorderDialog";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

export default function ClientReviews() {
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    document.title = "Client Reviews | Chapersons Services";
  }, []);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [search, setSearch] = useState("");
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

 const [formData, setFormData] = useState({
   name: "",
   company: "",
   review: "", // ✅ CORRECT
   rating: 5,
   image: null,
   is_active: true,
   display_order: 0,
 });

  // ================= FETCH =================
const fetchReviews = async () => {
  setLoading(true);
  try {
    const res = await api.get("/reviews");

    console.log("API Response:", res.data); // 👈 YAHAN LAGAO

    const data = res.data?.reviews || [];
    setReviews(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log("Fetch Error:", err); // 👈 Optional (error debug ke liye)
    toast.error("Failed to fetch reviews");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchReviews();
  }, []);

  // ================= IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  // ================= OPEN DIALOG =================
  const handleOpenDialog = (review = null) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        ...review,
        image: null,
      });
      setImagePreview(review.image ? `${baseURL}${review.image}` : null);
    } else {
      setEditingReview(null);
      setFormData({
        name: "",
        company: "",
        review: "",
        rating: 5,
        image: null,
        is_active: true,
        display_order: reviews.length,
      });
      setImagePreview(null);
    }
    setDialogOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (editingReview) {
       await api.put(`/reviews/${editingReview.id}`, data, {
         headers: { "Content-Type": "multipart/form-data" },
       });
        toast.success("Review updated");
      } else {
       await api.post("/reviews", data, {
         headers: { "Content-Type": "multipart/form-data" },
       });
        toast.success("Review created");
      }

      setDialogOpen(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
    await api.delete(`/reviews/${id}`);
      toast.success("Deleted successfully");
      fetchReviews();
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= TOGGLE =================
  const handleToggleActive = async (review) => {
    try {
     await api.put(`/reviews/${review.id}`, {
       is_active: !review.is_active,
     });
      fetchReviews();
    } catch {
      toast.error("Status update failed");
    }
  };

  const filteredReviews = reviews.filter((r) =>
    `${r.name} ${r.company} ${r.review}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // ================= UI =================
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
      <div>

      </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setIsReorderOpen(true)}>
            <Settings className="h-4 w-4 mr-1 text-blue-600" />
          </Button>
          <Input
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add Review
          </Button>
        </div>
      </div>

      <ReorderDialog
        isOpen={isReorderOpen}
        onClose={() => setIsReorderOpen(false)}
        items={reviews}
        onSave={fetchReviews}
        title="Reorder Reviews"
        displayKey="name"
      />

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-10 w-10" />
        </div>
      ) : filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            No reviews found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => {
            const imageURL = review.image
              ? `${baseURL}/api/uploads/reviews/${review.image}`
              : null;

            return (
              <div key={review.id} className="relative">
                {/* 🔵 CHECKBOX ACTIVE TOGGLE */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-full shadow-sm border">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {review.is_active ? "Active" : "Inactive"}
                    </span>

                    <Checkbox
                      checked={review.is_active}
                      onCheckedChange={() => handleToggleActive(review)}
                      className="h-4 w-4"
                    />
                  </div>
                </div>

                <Card
                  className={`overflow-hidden transition-all duration-300 
    ${!review.is_active ? "opacity-60 bg-muted/30" : "hover:shadow-lg"}`}
                >
                  {/* IMAGE TOP */}
                  {imageURL && (
                    <div className="h-40 overflow-hidden">
                      <img
                        src={imageURL}
                        alt="review"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle>{review.name}</CardTitle>

                    {review.company && (
                      <p className="text-sm text-muted-foreground">
                        {review.company}
                      </p>
                    )}

                    {/* Stars */}
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {review.review}
                    </p>

                    <div className="text-xs text-muted-foreground">
                      Order: {review.display_order}
                    </div>
                  </CardContent>

                  <div className="px-6 py-3 border-t flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenDialog(review)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => handleDelete(review.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {/* DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                {editingReview ? "Edit Review" : "Add Review"}
              </DialogTitle>
            </DialogHeader>

            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />

            <Textarea
              placeholder="Message"
              rows={3}
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rating: Number(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: Number(e.target.value),
                  })
                }
              />
            </div>

            <Input type="file" accept="image/*" onChange={handleImageChange} />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md border"
              />
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.is_active}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, is_active: val })
                }
              />
              <Label>Active</Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingReview ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
