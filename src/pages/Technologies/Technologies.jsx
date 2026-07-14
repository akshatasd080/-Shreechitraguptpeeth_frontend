import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, Cpu, Image as ImageIcon, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import ReorderDialog from "@/components/common/ReorderDialog";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';
const TECH_ICON_BASE = API_BASE_URL + '/uploads/technologies/';

export default function TechnologiesPage() {
  useEffect(() => {
    document.title = "Technologies | Immortal LMS";
  }, []);

  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const [formData, setFormData] = useState({
    name: "",
    is_active: true,
    display_order: 0,
    icon: null,
  });

  const fetchTechnologies = async () => {
    setLoading(true);
    try {
      const res = await api.get("/technologies");
      setTechnologies(res.data.technologies || []);
    } catch (err) {
      toast.error("Failed to fetch technologies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search, advancedFilters, limit]);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((tech) =>
        String(tech.name ?? "")
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

  const handleOpenDialog = (tech = null) => {
    if (tech) {
      setEditingTech(tech);
      setFormData({
        name: tech.name,
        is_active: tech.is_active,
        display_order: tech.display_order,
        icon: null,
      });
      setIconPreview(tech.icon ? `${TECH_ICON_BASE}${tech.icon}` : null);
    } else {
      setEditingTech(null);
      setFormData({
        name: "",
        is_active: true,
        display_order: technologies.length,
        icon: null,
      });
      setIconPreview(null);
    }
    setDialogOpen(true);
  };

  // Filtered data
  const filteredTechnologies = applyFilters(
    technologies,
    search,
    advancedFilters,
  );

  // Total items
  const total = filteredTechnologies.length;

  // Total pages (minimum 1)
  const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

  // Slice data
  const paginatedTechnologies = filteredTechnologies.slice(
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
   if (page > totalPages && totalPages > 0) {
     setPage(totalPages);
   }
 }, [totalPages]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, icon: file });
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReorder = async (orderedItems) => {
    try {
      const orderedIds = orderedItems.map((item) =>
        typeof item === "object" ? item.id : item,
      );

      await api.put("/technologies/reorder", {
        items: orderedIds,
      });

      // 🔥 Instant UI update
      setTechnologies((prev) =>
        orderedIds
          .map((id) => prev.find((tech) => tech.id === id))
          .filter(Boolean),
      );

      toast.success("Technologies reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder technologies");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("is_active", formData.is_active);
      data.append("display_order", formData.display_order);
      if (formData.icon) data.append("icon", formData.icon);

      if (editingTech) {
        await api.put(`/technologies/${editingTech.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Technology updated");
      } else {
        await api.post("/technologies", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Technology created");
      }
      setDialogOpen(false);
      fetchTechnologies();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving technology");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this technology?")) return;
    try {
      await api.delete(`/technologies/${id}`);
      toast.success("Technology deleted");
      fetchTechnologies();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleToggleActive = async (tech) => {
    try {
      await api.put(`/technologies/${tech.id}`, { is_active: !tech.is_active });
      toast.success(
        `Technology ${!tech.is_active ? "activated" : "deactivated"}`,
      );
      fetchTechnologies();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
   <RequirePermission permission="technology.read">
 <div className="min-h-screen flex flex-col p-6 space-y-6 bg-white dark:bg-slate-950 dark:text-gray-300">
       <div className="flex justify-between items-center">
  
  <div className="flex items-center gap-4">
    <FiltersPanel
      columns={columns}
      onApply={handleApplyAdvanced}
      onSave={() => {}}
    />
  </div>

  <div className="flex gap-2">

    <Button
      variant="guest"
      onClick={() => setIsReorderOpen(true)}
      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 dark:hover:bg-slate-800"
    >
      <Settings className="h-4 w-4" />
    </Button>

    <div>
      <Input
        placeholder="Search technologies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      />
    </div>

    <Button onClick={() => handleOpenDialog()}>
      <Plus className="mr-2 h-4 w-4" /> Add Tech
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
          items={technologies}
          onSave={handleReorder}
          title="Reorder Technologies"
          displayKey="name"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"> 
            {paginatedTechnologies.map((tech) => (
             <Card
  key={tech.id}
  className={`dark:bg-slate-900 dark:border-slate-700 ${
    !tech.is_active ? "opacity-70 bg-muted/30 dark:bg-slate-800" : ""
  }`}
>
  <CardContent className="pt-6 flex flex-col items-center">
    
    <div className="w-16 h-16 mb-4 flex items-center justify-center bg-muted dark:bg-slate-800 rounded-lg overflow-hidden">
      {tech.icon ? (
        <img
          src={`${TECH_ICON_BASE}${tech.icon}`}
          alt={tech.name}
          className="w-full h-full object-contain p-2"
        />
      ) : (
        <Cpu className="opacity-20 dark:text-gray-400" />
      )}
    </div>

    <h3 className="font-semibold text-center line-clamp-1 dark:text-white">
      {tech.name}
    </h3>

    <div className="flex gap-2 mt-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleOpenDialog(tech)}
        className="dark:text-gray-300 dark:hover:bg-slate-800"
      >
        <Edit2 className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-destructive dark:hover:bg-slate-800"
        onClick={() => handleDelete(tech.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>

    <div className="flex items-center gap-2 mt-2">
      <span className="text-[10px] uppercase font-bold text-muted-foreground dark:text-gray-400">
        {tech.is_active ? "Active" : "Inactive"}
      </span>

      <Checkbox
        checked={tech.is_active}
        onCheckedChange={() => handleToggleActive(tech)}
      />
    </div>

  </CardContent>
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
  <DialogContent className="dark:bg-slate-900 dark:border-slate-700">
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="dark:text-white">
          {editingTech ? "Edit Tech" : "Add Tech"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">

        <div className="space-y-2">
          <Label className="dark:text-gray-300">Name</Label>
          <Input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <Label className="dark:text-gray-300">Icon (Image/SVG)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          {iconPreview && (
            <div className="mt-2 w-16 h-16 bg-muted dark:bg-slate-800 rounded p-2">
              <img
                src={iconPreview}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Order</Label>
            <Input
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  display_order: e.target.value,
                })
              }
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="active"
              checked={formData.is_active}
              onCheckedChange={(val) =>
                setFormData({ ...formData, is_active: val })
              }
            />
            <Label htmlFor="active" className="dark:text-gray-300">
              Active
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

        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
      </div>
    </RequirePermission>
  );
}
