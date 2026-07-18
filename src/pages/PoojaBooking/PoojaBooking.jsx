import React, { useEffect, useMemo, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Eye, Search } from "lucide-react";

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"];

const statusClass = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminPoojaBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [preview, setPreview] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    document.title = "Pooja Bookings | Admin";
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/pooja-bookings");
      setBookings(res.data.bookings || []);
    } catch {
      toast.error("Failed to fetch pooja bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this pooja booking?")) return;
    try {
      await api.delete(`/pooja-bookings/${id}`);
      toast.success("Deleted successfully");
      fetchBookings();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/pooja-bookings/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchBookings();
      if (preview?.id === id) {
        setPreview((p) => (p ? { ...p, status } : p));
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filtered = useMemo(() => {
    let rows = bookings;
    if (statusFilter !== "all") {
      rows = rows.filter((b) => b.status === statusFilter);
    }
    const q = search.toLowerCase();
    if (!q) return rows;
    return rows.filter((b) =>
      [b.name, b.email, b.mobile, b.pooja, b.message, b.status]
        .map((v) => String(v ?? "").toLowerCase())
        .some((v) => v.includes(q))
    );
  }, [bookings, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / limit) || 1;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setPage(1);
  }, [search, limit, statusFilter]);

  const formatDate = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (d) => {
    if (!d) return "—";
    return new Date(d).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-white dark:bg-slate-950 text-black dark:text-white">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pooja Bookings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Requests submitted from the Pooja Request Form
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, mobile, pooja..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-800">
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Pooja</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No pooja bookings yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">
                        {(page - 1) * limit + index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell className="max-w-[160px]">
                        <span className="line-clamp-1">{row.pooja}</span>
                      </TableCell>
                      <TableCell>{formatDate(row.booking_date)}</TableCell>
                      <TableCell>{row.booking_time || "—"}</TableCell>
                      <TableCell>
                        <select
                          value={row.status}
                          onChange={(e) =>
                            handleStatusChange(row.id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 capitalize ${
                            statusClass[row.status] || "bg-gray-100"
                          }`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm">
                        {formatDateTime(row.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreview(row)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDelete(row.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
        <p className="text-sm text-muted-foreground">
          Showing page {page} of {totalPages} — {filtered.length} total
        </p>
        <div className="flex items-center gap-2">
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm dark:bg-slate-800 dark:border-slate-700"
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <Dialog open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Pooja Booking Details</DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Name</span>
                <span className="col-span-2 font-medium">{preview.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Email</span>
                <span className="col-span-2">{preview.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Mobile</span>
                <span className="col-span-2">{preview.mobile}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Pooja</span>
                <span className="col-span-2">{preview.pooja}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Date / Time</span>
                <span className="col-span-2">
                  {formatDate(preview.booking_date)}
                  {preview.booking_time ? ` · ${preview.booking_time}` : ""}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Status</span>
                <span className="col-span-2 capitalize">{preview.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Submitted</span>
                <span className="col-span-2">
                  {formatDateTime(preview.created_at)}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Message</p>
                <p className="whitespace-pre-wrap rounded-md border p-3 bg-slate-50 dark:bg-slate-800">
                  {preview.message || "—"}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
