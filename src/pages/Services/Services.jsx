import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, Layout } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";
import ReorderDialog from "@/components/common/ReorderDialog";
import { Settings } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services | Chapersons Services";
  }, []);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isReorderOpen, setIsReorderOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    is_active: true,
    display_order: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      setServices(res.data.services || []);
    } catch (err) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((service) =>
        String(service.title ?? "")
          .toLowerCase()
          .includes(q),
      );
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

  const handleOpenDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description || "",
        image: null,
        is_active: service.is_active,
        display_order: service.display_order,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        image: null,
        is_active: true,
        display_order: services.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("is_active", formData.is_active);
    form.append("display_order", formData.display_order);

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service updated successfully");
      } else {
        await api.post("/services", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service created successfully");
      }

      setDialogOpen(false);
      fetchServices();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await api.delete(`/services/${id}`);
      toast.success("Deleted successfully");
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredServices = applyFilters(services, search, advancedFilters);

  // ✅ Pagination Logic
  const total = filteredServices.length;
  const totalPages = Math.ceil(total / limit);

  const paginatedServices = filteredServices.slice(
    (page - 1) * limit,
    page * limit,
  );

  // Dynamic meta
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

      await api.put("/services/reorder", {
        items: orderedIds,
      });

      // 🔥 Instant UI update
      setServices((prev) =>
        orderedIds
          .map((id, index) => {
            const found = prev.find((s) => s.id === id);
            if (!found) return null;
            return {
              ...found,
              display_order: index,
            };
          })
          .filter(Boolean),
      );

      toast.success("Services reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder services");
    }
  };

  const handleToggleActive = async (service) => {
    try {
      const updatedStatus = !service.is_active;

      await api.put(`/services/${service.id}`, {
        is_active: updatedStatus,
      });

      // 🔥 Instant UI update
      setServices((prev) =>
        prev.map((item) =>
          item.id === service.id ? { ...item, is_active: updatedStatus } : item,
        ),
      );

      toast.success(
        `Service ${updatedStatus ? "activated" : "deactivated"} successfully`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
   <RequirePermission permission="service.read">
  <div className="p-6 space-y-6 dark:bg-slate-950 dark:text-gray-300">

<div className="flex justify-between items-center">

  {/* Left Side - Filter Button */}
  <div>
    <FiltersPanel
      columns={columns}
      onApply={handleApplyAdvanced}
      onSave={() => {}}
    />
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-3">

    {/* Settings */}
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsReorderOpen(true)}
      className="text-blue-600 dark:text-blue-400 dark:hover:bg-slate-800"
    >
      <Settings className="h-5 w-5" />
    </Button>

    {/* Search */}
    <Input
      placeholder="Search projects..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-64 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white"
    />

    {/* Add Button */}
    <Button
      onClick={() => handleOpenDialog()}
      className="bg-primary  px-5"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Service
    </Button>

  </div>

</div>

        {/* 🔹 Filter Chips Row */}
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
          items={services}
          onSave={handleReorder}
          title="Reorder Services"
          displayKey="title"
        />
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {paginatedServices.map((service) => (
    <div key={service.id} className="relative">

      {/* 🔵 CHECKBOX ACTIVE TOGGLE */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2 bg-background dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border dark:border-slate-700">
        <span className="text-xs font-semibold uppercase tracking-wide dark:text-gray-300">
          {service.is_active ? "Active" : "Inactive"}
        </span>

        <Checkbox
          checked={service.is_active}
          onCheckedChange={() => handleToggleActive(service)}
          className="h-4 w-4"
        />
      </div>

      <Card
        className={`dark:bg-slate-900 dark:border-slate-700 ${
          !service.is_active ? "opacity-70 dark:bg-slate-800" : ""
        }`}
      >

        {/* IMAGE */}
        {service.image && (
          <img
            src={`${API_URL}/${service.image}`}
            alt={service.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        )}

        <CardHeader>
          <CardTitle className="dark:text-white">
            {service.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            {service.description}
          </p>
        </CardContent>

        <div className="p-4 flex justify-end gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenDialog(service)}
            className="dark:border-slate-700 dark:text-gray-300"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(service.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>

        </div>

      </Card>
    </div>
  ))}
</div>
        )}

        {!loading && totalPages > 0 && (
        <div className="sticky bottom-0 z-20 p-4 bg-white dark:bg-slate-900 flex items-center justify-between border-t dark:border-slate-700">
  
  <div className="dark:text-gray-300">
    Showing page {meta.page} of {meta.totalPages} — {meta.total} total
  </div>

  <div className="flex items-center gap-4">

    <div className="flex items-center gap-2">
      <label className="text-sm dark:text-gray-300">
        Per page:
      </label>

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setPage(1);
        }}
        className="border rounded px-2 py-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      >
        {[6, 10, 20, 50].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>

    <Button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page <= 1}
    >
      Prev
    </Button>

    <span className="font-medium dark:text-gray-300">
      {page}
    </span>

    <Button
      onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
      disabled={page >= totalPages}
    >
      Next
    </Button>

  </div>

</div>
        )}

        {/* 🔥 DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="dark:bg-slate-900 dark:border-slate-700">
    <form onSubmit={handleSubmit} className="space-y-4">

      <DialogHeader>
        <DialogTitle className="dark:text-white">
          {editingService ? "Edit Service" : "Add Service"}
        </DialogTitle>
      </DialogHeader>

      <div>
        <Label className="dark:text-gray-300">
          Title
        </Label>

        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
          className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      <div>
        <Label className="dark:text-gray-300">
          Description
        </Label>

        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      <div>
        <Label className="dark:text-gray-300">
          Image
        </Label>

        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.files[0],
            })
          }
          className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>

      <DialogFooter>
        <Button type="submit">
          Save
        </Button>
      </DialogFooter>

    </form>
  </DialogContent>
</Dialog>
      </div>
    </RequirePermission>
  );
}
