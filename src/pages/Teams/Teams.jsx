import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, Users, Linkedin, Twitter, Github, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowUpDown } from "lucide-react";
import ReorderDialog from "@/components/common/ReorderDialog";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";


const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';
const TEAM_IMAGE_BASE = API_BASE_URL + '/uploads/teams/';

export default function TeamsPage() {
  useEffect(() => {
    document.title = "Team | Immortal LMS";
  }, []);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: "",
    is_active: true,
    display_order: 0,
    image: null,
  });

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await api.get("/teams");
      setTeams(res.data.teams || []);
    } catch (err) {
      toast.error("Failed to fetch team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
    { key: "linkedin_url", label: "LinkedIn" },
    { key: "twitter_url", label: "Twitter" },
    { key: "github_url", label: "GitHub" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((team) => {
        const name = String(team.name ?? "").toLowerCase();
        const designation = String(team.designation ?? "").toLowerCase();
        return name.includes(q) || designation.includes(q);
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

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditingTeam(member);
      setFormData({
        name: member.name,
        designation: member.designation,
        linkedin_url: member.linkedin_url || "",
        twitter_url: member.twitter_url || "",
        github_url: member.github_url || "",
        is_active: member.is_active,
        display_order: member.display_order,
        image: null,
      });
      setImagePreview(
        member.image ? `${TEAM_IMAGE_BASE}${member.image}` : null,
      );
    } else {
      setEditingTeam(null);
      setFormData({
        name: "",
        designation: "",
        linkedin_url: "",
        twitter_url: "",
        github_url: "",
        is_active: true,
        display_order: teams.length,
        image: null,
      });
      setImagePreview(null);
    }
    setDialogOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReorder = async (orderedItems) => {
    try {
      const orderedIds = orderedItems.map((item) =>
        typeof item === "object" ? item.id : item,
      );

      await api.put("/teams/reorder", {
        items: orderedIds,
      });

      setTeams((prev) =>
        orderedIds
          .map((id, index) => {
            const found = prev.find((team) => team.id === id);
            if (!found) return null;
            return {
              ...found,
              display_order: index,
            };
          })
          .filter(Boolean),
      );

      toast.success("Team reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder team");
    }
  };

  const filteredTeams = applyFilters(teams, search, advancedFilters);
  // Total
  const total = filteredTeams.length;

  // Total Pages
  const totalPages = Math.ceil(total / limit) || 1;

  // Paginated Data
  const paginatedTeams = filteredTeams.slice((page - 1) * limit, page * limit);

  // Dynamic Meta
  const meta = {
    page,
    limit,
    total,
    totalPages,
  };
  
  useEffect(() => {
    setPage(1);
  }, [search, advancedFilters, limit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          if (formData[key]) data.append("image", formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      });

      if (editingTeam) {
        await api.put(`/teams/${editingTeam.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Member updated");
      } else {
        await api.post("/teams", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Member added");
      }
      setDialogOpen(false);
      fetchTeams();
    } catch (err) {
      toast.error("Error saving");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    try {
      await api.delete(`/teams/${id}`);
      toast.success("Deleted");
      fetchTeams();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleToggleActive = async (member) => {
    try {
      const updatedStatus = !member.is_active;

      await api.put(`/teams/${member.id}`, {
        is_active: updatedStatus,
      });

      // 🔥 Instant UI update (no refresh)
      setTeams((prev) =>
        prev.map((item) =>
          item.id === member.id ? { ...item, is_active: updatedStatus } : item,
        ),
      );

      toast.success(
        `Member ${updatedStatus ? "activated" : "deactivated"} successfully`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };


  const formatUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();

  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
};

  return (
<RequirePermission permission="team.read">
  <div className="p-6 space-y-6 bg-white dark:bg-slate-950 text-black dark:text-white">

    <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
  
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
        placeholder="Search team members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
      />
    </div>

    <Button onClick={() => handleOpenDialog()}>
      <Plus className="mr-2 h-4 w-4" /> Add Member
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
          items={teams}
          onSave={handleReorder}
          title="Reorder Team"
          displayKey="name"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedTeams.map((member) => (
              <div key={member.id} className="relative">
                {/* 🔵 CHECKBOX TOGGLE (Same Style as Services) */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-full shadow-sm border">
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {member.is_active ? "Active" : "Inactive"}
                    </span>

                    <Checkbox
                      checked={member.is_active}
                      onCheckedChange={() => handleToggleActive(member)}
                      className="h-4 w-4"
                    />
                  </div>
                </div>

                {/* CARD */}
             <Card
  className={`overflow-hidden transition-all duration-300 dark:bg-slate-900 dark:border-slate-700
    ${
      !member.is_active
        ? "opacity-60 bg-muted/30 dark:bg-slate-800"
        : "hover:shadow-lg"
    }`}
>
  <CardContent className="flex flex-col items-center text-center p-6">

    {/* Avatar */}
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 mb-4 bg-muted dark:bg-slate-800">
      {member.image ? (
        <img
          src={`${TEAM_IMAGE_BASE}${member.image}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <Users className="h-8 w-8 opacity-30 dark:text-gray-400" />
        </div>
      )}
    </div>

    <h3 className="text-lg font-semibold dark:text-white">
      {member.name}
    </h3>

    <p className="text-sm text-primary font-medium mb-3">
      {member.designation}
    </p>

    <div className="flex gap-3 mb-4">
      {member.linkedin_url && (
        <Linkedin className="h-4 w-4 text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors cursor-pointer" />
      )}
      {member.twitter_url && (
        <Twitter className="h-4 w-4 text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors cursor-pointer" />
      )}
      {member.github_url && (
        <Github className="h-4 w-4 text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors cursor-pointer" />
      )}
    </div>

    <div className="flex gap-2 mt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenDialog(member)}
        className="dark:border-slate-700 dark:text-gray-300"
      >
        <Edit2 className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="text-destructive hover:bg-destructive/10 dark:border-slate-700"
        onClick={() => handleDelete(member.id)}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>

  </CardContent>
</Card>
              </div>
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

    <div className="dark:text-gray-300">
      {page}
    </div>

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
          {editingTeam ? "Edit Member" : "Add Member"}
        </DialogTitle>
      </DialogHeader>

      <div className="grid gap-4 py-4">

        <div className="grid grid-cols-2 gap-4">
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
            <Label className="dark:text-gray-300">Designation</Label>
            <Input
              value={formData.designation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  designation: e.target.value,
                })
              }
              required
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="dark:text-gray-300">Photo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              className="mt-2 h-20 w-20 object-cover rounded"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label className="dark:text-gray-300">LinkedIn</Label>
         <Input
  value={formData.linkedin_url}
  onChange={(e) =>
    setFormData({
      ...formData,
      linkedin_url: formatUrl(e.target.value),
    })
  }
  placeholder="https://linkedin.com/in/username"
/>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label className="dark:text-gray-300">Twitter</Label>
           <Input
  value={formData.twitter_url}
  onChange={(e) =>
    setFormData({
      ...formData,
      twitter_url: formatUrl(e.target.value),
    })
  }
  placeholder="https://twitter.com/username"
/>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">GitHub</Label>
           <Input
  value={formData.github_url}
  onChange={(e) =>
    setFormData({
      ...formData,
      github_url: formatUrl(e.target.value),
    })
  }
  placeholder="https://github.com/username"
/>
          </div>

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
              id="team-active"
              checked={formData.is_active}
              onCheckedChange={(val) =>
                setFormData({ ...formData, is_active: val })
              }
            />
            <Label htmlFor="team-active" className="dark:text-gray-300">
              Active
            </Label>
          </div>

        </div>

      </div>

      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>

    </form>
  </DialogContent>
</Dialog>

      </div>
    </RequirePermission>
  );
}
