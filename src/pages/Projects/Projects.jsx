import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, Layout, ExternalLink, Image as ImageIcon, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import ReorderDialog from "@/components/common/ReorderDialog";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";


const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';
const IMAGE_BASE_URL = API_BASE_URL + '/uploads/projects/';

export default function ProjectsPage() {
  useEffect(() => {
    document.title = "Projects | Chapersons Services";
  }, []);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});

  const [limit, setLimit] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = limit; // limit ko use karenge
 
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    is_active: true,
    display_order: 0,
    image: null,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || []);
    } catch (err) {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "url", label: "URL" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((project) => {
        const name = String(project.name ?? "").toLowerCase();
        const description = String(project.description ?? "").toLowerCase();
        const url = String(project.url ?? "").toLowerCase();
        return name.includes(q) || description.includes(q) || url.includes(q);
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

  const handleOpenDialog = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        url: project.url || "",
        description: project.description || "",
        is_active: project.is_active,
        display_order: project.display_order,
        image: null,
      });
      setImagePreview(
        project.image ? `${IMAGE_BASE_URL}${project.image}` : null,
      );
    } else {
      setEditingProject(null);
      setFormData({
        name: "",
        url: "",
        description: "",
        is_active: true,
        display_order: projects.length,
        image: null,
      });
      setImagePreview(null);
    }
    setDialogOpen(true);
  };

  const filteredProjects = applyFilters(projects, search, advancedFilters);
const totalPages = Math.max(
  1,
  Math.ceil(filteredProjects.length / itemsPerPage),
);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
}, [totalPages]);

useEffect(() => {
  setCurrentPage(1);
}, [search, advancedFilters, limit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("url", formData.url);
      data.append("description", formData.description);
      data.append("is_active", formData.is_active);
      data.append("display_order", formData.display_order);
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Project created successfully");
      }
      setDialogOpen(false);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  const handleReorder = async (orderedItems) => {
    try {
      const orderedIds = orderedItems.map((item) =>
        typeof item === "object" ? item.id : item,
      );

      await api.put("/projects/reorder", {
        items: orderedIds,
      });

      // 🔥 Instant re-render
      setProjects((prev) => {
        return orderedIds
          .map((id) => prev.find((project) => project.id === id))
          .filter(Boolean);
      });

      toast.success("Projects reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder projects");
    }
  };

  const handleToggleActive = async (project) => {
    try {  
      await api.put(`/projects/${project.id}`, {
        is_active: !project.is_active,
      });
      toast.success(
        `Project ${!project.is_active ? "activated" : "deactivated"} successfully`,
      );
      fetchProjects();
    } catch (err) {
      toast.error("Failed to update project status");
    }
  };

  return (
  <RequirePermission permission="project.read">
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
      placeholder="Search projects..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-white dark:bg-slate-800 border dark:border-slate-700 dark:text-white"
    />
  </div>

  <Button
    onClick={() => handleOpenDialog()}
    className="bg-primary "
  >
    <Plus className="mr-2 h-4 w-4" /> Add Project
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
          items={projects}
          onSave={handleReorder}
          title="Reorder Projects"
          displayKey="name"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : projects.length === 0 ? (
     <Card className="dark:bg-slate-900 dark:border-slate-700">
  <CardContent className="flex flex-col items-center justify-center py-12 text-center">

    <div className="bg-muted dark:bg-slate-800 rounded-full p-4 mb-4">
      <Layout className="h-8 w-8 text-muted-foreground dark:text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold dark:text-white">
      No projects found
    </h3>

    <p className="text-muted-foreground dark:text-gray-400 mb-6">
      Get started by creating your first project.
    </p>

    <Button onClick={() => handleOpenDialog()}>
      <Plus className="mr-2 h-4 w-4" /> Create Project
    </Button>

  </CardContent>
</Card>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {currentProjects.map((project) => (
    <Card
      key={project.id}
      className={`overflow-hidden transition-all duration-300 dark:bg-slate-900 dark:border-slate-700 ${
        !project.is_active
          ? "opacity-70 bg-muted/30 dark:bg-slate-800"
          : "hover:shadow-md border-primary/10"
      }`}
    >
      <div className="aspect-video relative bg-muted dark:bg-slate-800 overflow-hidden">
        {project.image ? (
          <img
            src={`${IMAGE_BASE_URL}${project.image}`}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground dark:text-gray-400">
            <ImageIcon className="h-12 w-12 opacity-20" />
          </div>
        )}

        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-2 bg-background/80 dark:bg-slate-900/80 backdrop-blur-sm border dark:border-slate-700 rounded-full px-3 py-1 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-400">
              {project.is_active ? "Active" : "Inactive"}
            </span>

            <Checkbox
              id={`active-${project.id}`}
              checked={project.is_active}
              onCheckedChange={() => handleToggleActive(project)}
              className="h-4 w-4"
            />
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1 dark:text-white">
            {project.name}
          </CardTitle>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground dark:text-gray-400">
          <span className="font-medium bg-secondary dark:bg-slate-800 px-1.5 py-0.5 rounded">
            Order: {project.display_order}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 min-h-[40px]">
          {project.description || "No description provided."}
        </p>
      </CardContent>

      <div className="px-6 py-4 border-t dark:border-slate-700 bg-muted/20 dark:bg-slate-800 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenDialog(project)}
          className="dark:border-slate-700 dark:text-gray-300"
        >
          <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/10 dark:border-slate-700"
          onClick={() => handleDelete(project.id)}
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
    Showing page {currentPage} of {totalPages} —{" "}
    {filteredProjects.length} total
  </div>

  <div className="flex items-center gap-3">

    <div className="flex items-center gap-2">
      <label className="dark:text-gray-300">Per page:</label>

      <select
        value={limit}
        onChange={(e) => {
          setLimit(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="border rounded px-2 py-1 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      >
        {[6, 12, 24, 48].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>

    <Button
      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
      disabled={currentPage === 1}
    >
      Prev
    </Button>

    <div className="dark:text-gray-300">
      {currentPage}
    </div>

    <Button
      onClick={() =>
        setCurrentPage((p) => (p < totalPages ? p + 1 : p))
      }
      disabled={currentPage === totalPages}
    >
      Next
    </Button>

  </div>

</div>


    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="max-w-3xl p-0 rounded-2xl overflow-hidden dark:bg-slate-900 dark:border-slate-700">

    {/* Header */}
    <div className="px-6 py-4 border-b bg-slate-50 dark:bg-slate-800 dark:border-slate-700 flex justify-between items-center">
      <div>
        <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-white">
          {editingProject ? "Edit Project" : "Add New Project"}
        </DialogTitle>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage your project details
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit}>

      <div className="grid md:grid-cols-2 gap-6 p-6">

        {/* LEFT SIDE */}
        <div className="space-y-4">

          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="dark:text-gray-300">
              Project Name *
            </Label>

            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Immortal Tapes"
              required
              className="rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="dark:text-gray-300">
              Project URL
            </Label>

            <Input
              id="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              placeholder="https://example.com"
              className="rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="dark:text-gray-300">
              Description
            </Label>

            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Describe the project..."
              rows={4}
              className="rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

          {/* Order + Active */}
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
                    display_order: parseInt(e.target.value),
                  })
                }
                className="rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <Checkbox
                id="is_active_form"
                checked={formData.is_active}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, is_active: val })
                }
              />
              <Label htmlFor="is_active_form" className="dark:text-gray-300">
                Active
              </Label>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          <Label htmlFor="image" className="dark:text-gray-300">
            Project Image
          </Label>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:border-[#2e7eff] transition">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Upload project thumbnail
            </p>
          </div>

          {/* Small Preview */}
          {imagePreview && (
            <div className="relative w-40 h-28 rounded-xl overflow-hidden border dark:border-slate-700 shadow-md">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
          className="dark:border-slate-700 dark:text-gray-300"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-[#1d5da2] text-white"
        >
          Save Project
        </Button>

      </div>

    </form>
  </DialogContent>
</Dialog>
      </div>
    </RequirePermission>
  );
}
