import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import RequirePermission from "@/components/common/RequirePermission";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Plus, Layout, Zap, Smartphone, Globe, Code, Cloud, Palette, LifeBuoy, ShoppingCart, Cpu, ShieldCheck, Layers, Rocket, TrendingUp, Users, Package, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReorderDialog from "@/components/common/ReorderDialog";
import { Settings } from "lucide-react";
import FiltersPanel from "@/components/FiltersPanel";
import FilterChips from "@/components/FilterChips";

const ICON_OPTIONS = [
  { name: 'Globe', icon: Globe },  
  { name: 'Code', icon: Code },
  { name: 'Cpu', icon: Cpu },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'ShoppingCart', icon: ShoppingCart },
  { name: 'Cloud', icon: Cloud },
  { name: 'Palette', icon: Palette },
  { name: 'LifeBuoy', icon: LifeBuoy },
  { name: 'ShieldCheck', icon: ShieldCheck },
  { name: 'Layers', icon: Layers },
  { name: 'Zap', icon: Zap },
  { name: 'Rocket', icon: Rocket },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'Users', icon: Users },
  { name: 'Package', icon: Package },
];

const IconComponent = ({ name, className }) => {
  const iconObj = ICON_OPTIONS.find(i => i.name === name);
  const Icon = iconObj ? iconObj.icon : Layout;
  return <Icon className={className} />;
};

export default function ProductsPage() {
  useEffect(() => {
    document.title = "Products | Immortal LMS";
  }, []);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [advancedFilters, setAdvancedFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Layout",
    url: "",
    is_active: true,
    display_order: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "url", label: "URL" },
    { key: "icon", label: "Icon" },
    { key: "is_active", label: "Active", type: "boolean" },
    { key: "display_order", label: "Order", type: "number" },
  ];

  const applyFilters = (items, query, filters) => {
    const q = String(query || "").toLowerCase();
    let out = Array.isArray(items) ? items.slice() : [];

    if (q) {
      out = out.filter((product) => {
        const title = String(product.title ?? "").toLowerCase();
        const description = String(product.description ?? "").toLowerCase();
        const url = String(product.url ?? "").toLowerCase();
        return title.includes(q) || description.includes(q) || url.includes(q);
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

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description || "",
        icon: product.icon || "Layout",
        url: product.url || "",
        is_active: product.is_active,
        display_order: product.display_order,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        icon: "Layout",
        url: "",
        is_active: true,
        display_order: products.length,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formData);
        toast.success("Product updated successfully");
      } else {
        await api.post("/products", formData);
        toast.success("Product created successfully");
      }
      setDialogOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await api.put(`/products/${product.id}`, {
        is_active: !product.is_active,
      });
      toast.success(
        `Product ${!product.is_active ? "activated" : "deactivated"} successfully`,
      );
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update product status");
    }
  };

  const filteredProducts = applyFilters(products, search, advancedFilters);

  // Total
  const total = filteredProducts.length;

  // Total Pages
  const totalPages = Math.ceil(total / limit) || 1;

  // Paginated Data
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit,
  );

  // Meta (same as services)
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

      await api.put("/products/reorder", {
        items: orderedIds,
      });

      // 🔥 Instant UI update
      setProducts((prev) =>
        orderedIds
          .map((id, index) => {
            const found = prev.find((p) => p.id === id);
            if (!found) return null;
            return {
              ...found,
              display_order: index,
            };
          })
          .filter(Boolean),
      );

      toast.success("Products reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reorder products");
    }
  };

  return (
 <RequirePermission permission="product.read">
 <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">

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
              variant="ghost"
              onClick={() => setIsReorderOpen(true)}
              className="flex items-center gap-2 text-blue-600"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => handleOpenDialog()} className="bg-primary">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
        <div className="p-2 bg-white rounded-md border">
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
          items={products}
          onSave={handleReorder}
          title="Reorder Products"
          displayKey="title"
        />

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : products.length === 0 ? (
        <Card className="dark:bg-slate-900 dark:border-slate-700">
  <CardContent className="flex flex-col items-center justify-center py-12 text-center">

    <div className="bg-muted dark:bg-slate-800 rounded-full p-4 mb-4">
      <Package className="h-8 w-8 text-muted-foreground dark:text-gray-400" />
    </div>

    <h3 className="text-lg font-semibold dark:text-white">
      No products found
    </h3>

    <p className="text-muted-foreground dark:text-gray-400 mb-6">
      Get started by creating your first product.
    </p>

    <Button onClick={() => handleOpenDialog()}>
      <Plus className="mr-2 h-4 w-4" /> Create Product
    </Button>

  </CardContent>
</Card>
        ) : (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">

  {paginatedProducts.map((product) => (

    <Card
      key={product.id}
      className={`overflow-hidden rounded-xl transition-all duration-300 
      dark:bg-slate-900 dark:border-slate-700
      hover:-translate-y-1 hover:shadow-xl
      ${
        !product.is_active
          ? "opacity-70 bg-muted/30 dark:bg-slate-800"
          : "border-primary/10"
      }`}
    >

      <CardHeader className="pb-3">

        <div className="flex justify-between items-start">

          {/* Icon */}
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary 
          transition-all duration-300 group-hover:scale-110">
            <IconComponent name={product.icon} className="h-6 w-6" />
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2 bg-background dark:bg-slate-800 border dark:border-slate-700 rounded-full px-3 py-1">
              
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-400">
                {product.is_active ? "Active" : "Inactive"}
              </span>

              <Checkbox
                id={`active-${product.id}`}
                checked={product.is_active}
                onCheckedChange={() => handleToggleActive(product)}
                className="h-4 w-4"
              />

            </div>
          </div>

        </div>

        {/* Title */}
        <div className="mt-4">
          <CardTitle className="text-xl line-clamp-1 flex items-center gap-2 dark:text-white">
            
            {product.title}

            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}

          </CardTitle>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground dark:text-gray-400">
            <span className="font-medium bg-secondary dark:bg-slate-800 px-1.5 py-0.5 rounded">
              Order: {product.display_order}
            </span>
          </div>
        </div>

      </CardHeader>

      {/* Description */}
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-3 min-h-[60px]">
          {product.description || "No description provided."}
        </p>
      </CardContent>

      {/* Actions */}
      <div className="px-6 py-4 border-t dark:border-slate-700 bg-muted/20 dark:bg-slate-800 flex justify-end gap-2">

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleOpenDialog(product)}
          className="dark:border-slate-700 dark:text-gray-300 hover:bg-primary/10"
        >
          <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive/10 dark:border-slate-700"
          onClick={() => handleDelete(product.id)}
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
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-4">

        <div className="space-y-2">
          <Label htmlFor="title" className="dark:text-gray-300">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g. CRM System"
            required
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url" className="dark:text-gray-300">Product URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) =>
              setFormData({ ...formData, url: e.target.value })
            }
            placeholder="e.g. https://crm.example.com"
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="dark:text-gray-300">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the product..."
            rows={3}
            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="icon" className="dark:text-gray-300">Icon</Label>
            <Select
              value={formData.icon}
              onValueChange={(val) =>
                setFormData({ ...formData, icon: val })
              }
            >
              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>

              <SelectContent className="dark:bg-slate-900 dark:border-slate-700 dark:text-gray-300">
                {ICON_OPTIONS.map((opt) => (
                  <SelectItem key={opt.name} value={opt.name}>
                    <div className="flex items-center gap-2">
                      <opt.icon className="h-4 w-4" />
                      <span>{opt.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>

        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={(val) =>
              setFormData({ ...formData, is_active: val })
            }
          />
          <Label htmlFor="is_active" className="dark:text-gray-300">
            Active
          </Label>
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

        <Button type="submit">Save Product</Button>
      </DialogFooter>

    </form>
  </DialogContent>
</Dialog>
      </div>
    </RequirePermission>
  );
}
