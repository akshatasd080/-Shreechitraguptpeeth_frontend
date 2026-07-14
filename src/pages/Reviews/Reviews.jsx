import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, MessageSquare, User, Briefcase, Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";
import { Settings } from "lucide-react";
import ReorderDialog from "@/components/common/ReorderDialog";

export default function ReviewsPage() {
  useEffect(() => {
    document.title = "Client Reviews | Immortal LMS";
  }, []);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    is_active: true,
    display_order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";
  const IMAGE_BASE_URL = API_BASE_URL + "/uploads/reviews/";

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/reviews");
      setReviews(res.data.reviews || []);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role / Company" },
    { key: "review", label: "Review" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((item) => {
        const name = String(item.name ?? "").toLowerCase();
        const role = String(item.role ?? "").toLowerCase();
        const text = String(item.review ?? "").toLowerCase();
        return name.includes(q) || role.includes(q) || text.includes(q);
      });
    }

    if (Array.isArray(filters) && filters.length > 0) {
      out = out.filter((row) =>
        filters.every((f) => {
          const key = f.field || f.key;
          const op = f.op || f.operator || "contains";
          const v = f.value;
          const val = row[key];

          if (typeof v === "undefined" || v === null || v === "") {
            if (op === "isEmpty") return val == null || val === "";
            if (op === "isAnything") return true;
          }

          if (Array.isArray(v) && op === "between") {
            const from = v[0];
            const to = v[1];
            const num = Number(val);
            if (!Number.isNaN(num)) {
              const nf = Number(from);
              const nt = Number(to);
              if (from && to) return num >= nf && num <= nt;
              if (from) return num >= nf;
              if (to) return num <= nt;
            }
            const d = new Date(val).getTime();
            const df = from ? new Date(from).getTime() : null;
            const dt = to ? new Date(to).getTime() : null;
            if (df && dt) return d >= df && d <= dt;
            if (df) return d >= df;
            if (dt) return d <= dt;
            return true;
          }

          if (op === "eq") return String(val) === String(v);
          if (op === "ne") return String(val) !== String(v);
          if (op === "lt") return Number(val) < Number(v);
          if (op === "lte") return Number(val) <= Number(v);
          if (op === "gt") return Number(val) > Number(v);
          if (op === "gte") return Number(val) >= Number(v);
          if (op === "startsWith")
            return String(val ?? "")
              .toLowerCase()
              .startsWith(String(v).toLowerCase());
          if (op === "endsWith")
            return String(val ?? "")
              .toLowerCase()
              .endsWith(String(v).toLowerCase());
          if (op === "notContains")
            return !String(val ?? "")
              .toLowerCase()
              .includes(String(v).toLowerCase());
          if (op === "in" && Array.isArray(v))
            return v.map(String).includes(String(val));
          if (op === "isEmpty") return val == null || val === "";
          if (op === "isNotEmpty") return !(val == null || val === "");

          return String(val ?? "")
            .toLowerCase()
            .includes(String(v).toLowerCase());
        }),
      );
    }

    return out;
  };

  const handleApplyAdvanced = (filters) => {
    setAdvancedFilters(filters || []);
  };

  const handleOpenDialog = (review = null) => {
    if (review) {
      setEditingReview(review);
      setFormData({
        name: review.name,
        role: review.role || "",
        review: review.review,
        is_active: review.is_active,
        display_order: review.display_order,
      });
      setImagePreview(review.image ? `${IMAGE_BASE_URL}${review.image}` : null);
    } else {
      setEditingReview(null);
      setFormData({
        name: "",
        role: "",
        review: "",
        is_active: true,
        display_order: reviews.length,
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("role", formData.role);
    data.append("review", formData.review);
    data.append("is_active", formData.is_active);
    data.append("display_order", formData.display_order);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      if (editingReview) {
        await api.put(`/reviews/${editingReview.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Review updated successfully");
      } else {
        await api.post("/reviews", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Review created successfully");
      }
      setDialogOpen(false);
      fetchReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const handleToggleActive = async (review) => {
    try {
      await api.put(`/reviews/${review.id}`, { is_active: !review.is_active });
      toast.success(
        `Review ${!review.is_active ? "activated" : "deactivated"} successfully`,
      );
      fetchReviews();
    } catch (err) {
      toast.error("Failed to update review status");
    }
  };





  const filteredReviews = applyFilters(reviews, search, advancedFilters);
  // Total
  const total = filteredReviews.length;

  // Total Pages
  const totalPages = Math.ceil(total / limit) || 1;

  // Paginated Data
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * limit,
    page * limit,
  );

  // Meta
  const meta = {
    page,
    limit,
    total,
    totalPages,
  };
  
useEffect(() => {
  setPage(1);
}, [search, advancedFilters, limit]);


const handleReorder = async (orderedItems) => {
  try {
    const orderedIds = orderedItems.map((item) =>
      typeof item === "object" ? item.id : item,
    );

    await api.put("/reviews/reorder", {
      items: orderedIds,
    });

    setReviews((prev) =>
      orderedIds
        .map((id, index) => {
          const found = prev.find((r) => r.id === id);
          if (!found) return null;
          return {
            ...found,
            display_order: index,
          };
        })
        .filter(Boolean),
    );

    toast.success("Reviews reordered successfully");
  } catch (error) {
    toast.error("Failed to reorder reviews");
  }
};

  return (
<RequirePermission permission="review.read">
  <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">

    <div className="flex items-center justify-between px-4 py-3 rounded-xl dark:bg-slate-900 dark:border dark:border-slate-700">

  
  {/* LEFT SIDE */}
  <div>
    <FiltersPanel
      columns={columns}
      onApply={handleApplyAdvanced}
      onSave={() => {}}
    />
  </div>

  {/* RIGHT SIDE */}
 <div className="flex items-center gap-3">

  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsReorderOpen(true)}
    className="text-blue-600 dark:text-blue-400 dark:hover:bg-slate-800"
  >
    <Settings className="h-5 w-5" />
  </Button>

  <Input
    placeholder="Search reviews..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-64 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
  />

  <Button
    onClick={() => handleOpenDialog()}
    className="bg-primary text-white px-5"
  >
    <Plus className="mr-2 h-4 w-4" />
    Add Review
  </Button>

</div>
</div>
       <div className="p-2 bg-white dark:bg-slate-900 rounded-md border dark:border-slate-700">
  <FilterChips
    columnFilters={columnFilters}
    advancedFilters={advancedFilters}
    onRemoveColumnFilter={(k) => {
      setColumnFilters((prev) => {
        const next = { ...prev };
        delete next[k];
        return next;
      });
    }}
    onClearAll={() => {
      setColumnFilters({});
      setAdvancedFilters([]);
      setSearch("");
    }}
  />
</div>


        <ReorderDialog
          isOpen={isReorderOpen}
          onClose={() => setIsReorderOpen(false)}
          items={reviews}
          onSave={handleReorder}
          title="Reorder Reviews"
          displayKey="name"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : filteredReviews.length === 0 ? (
         <Card className="dark:bg-slate-900 dark:border-slate-700">
  <CardContent className="flex flex-col items-center justify-center py-12 text-center">

    <div className="bg-muted dark:bg-slate-800 rounded-full p-4 mb-4">
      <MessageSquare className="h-8 w-8 text-muted-foreground dark:text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold dark:text-white">
      No reviews found
    </h3>

    <p className="text-muted-foreground dark:text-gray-400 mb-6">
      Get started by adding your first client review.
    </p>

    <Button onClick={() => handleOpenDialog()}>
      <Plus className="mr-2 h-4 w-4" /> Add Review
    </Button>

  </CardContent>
</Card>
        ) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">

  {paginatedReviews.map((review) => (

    <Card
      key={review.id}
      className={`overflow-hidden rounded-xl transition-all duration-300 
      dark:bg-slate-900 dark:border-slate-700
      hover:-translate-y-1 hover:shadow-xl
      ${
        !review.is_active
          ? "opacity-70 bg-muted/30 dark:bg-slate-800"
          : "border-primary/10"
      }`}
    >

      <CardHeader className="pb-3">

        <div className="flex justify-between items-start">

          {/* Profile Image */}
          <div className="h-16 w-16 rounded-full overflow-hidden bg-muted dark:bg-slate-800 border-2 border-primary/10 
          transition-all duration-300 group-hover:scale-105">
            
            {review.image ? (
              <img
                src={`${IMAGE_BASE_URL}${review.image}`}
                alt={review.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary/5 text-primary">
                <User className="h-8 w-8" />
              </div>
            )}

          </div>

          {/* Active Toggle */}
          <div className="flex items-center space-x-2 bg-background dark:bg-slate-800 border dark:border-slate-700 rounded-full px-3 py-1">
            
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-400">
              {review.is_active ? "Active" : "Inactive"}
            </span>

            <Checkbox
              id={`active-${review.id}`}
              checked={review.is_active}
              onCheckedChange={() => handleToggleActive(review)}
              className="h-4 w-4"
            />

          </div>

        </div>

        {/* Name + Role */}
        <div className="mt-4">

          <CardTitle className="text-xl line-clamp-1 dark:text-white">
            {review.name}
          </CardTitle>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground dark:text-gray-400">
            
            <Briefcase className="h-3 w-3" />

            <span className="line-clamp-1">
              {review.role || "Client"}
            </span>

            <span className="mx-1">•</span>

            <span className="font-medium bg-secondary dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Order: {review.display_order}
            </span>

          </div>

        </div>

      </CardHeader>

      {/* Review Text */}
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-4 min-h-[80px] italic">
          "{review.review}"
        </p>
      </CardContent>

      {/* Actions */}
      <div className="px-6 py-4 border-t dark:border-slate-700 bg-muted/20 dark:bg-slate-800 flex justify-end gap-2">

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenDialog(review)}
          className="dark:border-slate-700 dark:text-gray-300 hover:bg-primary/10"
        >
          <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/10 dark:border-slate-700"
          onClick={() => handleDelete(review.id)}
        >
          <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete
        </Button>

      </div>

    </Card>

  ))}

</div>
        )}

     <div className="sticky bottom-0 z-20 p-4 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0">
  
  <div className="dark:text-gray-300">
    Showing page {meta.page} of {meta.totalPages} — {meta.total} total
  </div>

  <div className="flex items-center gap-2">

    <div className="flex items-center gap-2">
      <label className="dark:text-gray-300">Per page:</label>

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
        className="border rounded px-2 py-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      >
        {[6, 10, 20, 50, 100].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>

    <Button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
    >
      Prev
    </Button>

    <div className="dark:text-gray-300">{page}</div>

    <Button
      onClick={() => setPage((p) => (p < meta.totalPages ? p + 1 : p))}
      disabled={page === meta.totalPages}
    >
      Next
    </Button>

  </div>
</div>

       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="sm:max-w-[500px] dark:bg-slate-900 dark:border-slate-700">
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="dark:text-white">
          {editingReview ? "Edit Review" : "Add New Review"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <div className="flex justify-center mb-4">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted border-2 border-dashed border-primary/20 flex items-center justify-center dark:bg-slate-800">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground dark:text-gray-400" />
              )}
            </div>

            <Label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full text-[10px] font-bold"
            >
              CHANGE
            </Label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="dark:text-gray-300">
              Client Name *
            </Label>

            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. John Doe"
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="dark:text-gray-300">
              Role / Company
            </Label>

            <Input
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="e.g. CEO at TechCorp"
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="review" className="dark:text-gray-300">
            Review *
          </Label>

          <Textarea
            id="review"
            value={formData.review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
            placeholder="Enter the client testimonial..."
            className="min-h-[120px] dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="display_order" className="dark:text-gray-300">
              Display Order
            </Label>

            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
            />

            <Label htmlFor="is_active" className="dark:text-gray-300">
              Active on Home Page
            </Label>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
          className="dark:border-slate-700 dark:text-gray-300"
        >
          Cancel
        </Button>

        <Button type="submit">
          {editingReview ? "Update Review" : "Create Review"}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
      </div>
    </RequirePermission>
  );
}
