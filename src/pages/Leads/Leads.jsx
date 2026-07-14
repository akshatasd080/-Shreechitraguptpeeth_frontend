// src/pages/Leads.jsx

import React, { useEffect, useMemo, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import RequirePermission from "@/components/common/RequirePermission";
import { FiInfo } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import FiltersPanel from "@/components/FiltersPanel";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import TableConfigPanel from "@/components/config/TableConfigPanel";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LeadsPage() {

  useEffect(() => {
    document.title = "Leads | Chapersons Services";
  }, []);

  /* ================= STATES ================= */

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const [sort, setSort] = useState({ key: null, dir: null });

  const [editing, setEditing] = useState({
    rowId: null,
    colKey: null,
    value: "",
  });

  const [columns] = useState([
    { key: "name", label: "Name", visible: true, order: 1 },
    { key: "email", label: "Email", visible: true, order: 2 },
    { key: "mobile_number", label: "Mobile", visible: true, order: 3 },
    { key: "company", label: "Company", visible: true, order: 4 },
    { key: "service", label: "Service", visible: true, order: 5 },
    { key: "message", label: "Message", visible: true, order: 6 },
    { key: "createdAt", label: "Created At", visible: true, order: 7 },
  ]);

  /* ================= FETCH ================= */

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const res = await api.get("/leads");

      const leads = res.data?.data || [];

      setRows(Array.isArray(leads) ? leads : []);

    } catch (err) {

      console.error(err);
      toast.error("Failed to fetch leads");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchLeads();   
  }, []);

  /* ================= FILTER ================= */

  const filteredRows = useMemo(() => {

    return rows.filter((row) =>
      Object.values(row)
        .map((v) => String(v ?? ""))
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

  }, [rows, query]);

  /* ================= SORT ================= */

  const sortedRows = useMemo(() => {

    if (!sort.key || !sort.dir) return filteredRows;

    return [...filteredRows].sort((a, b) => {

      const av = a[sort.key] ?? "";
      const bv = b[sort.key] ?? "";

      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));

    });

  }, [filteredRows, sort]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(sortedRows.length / limit) || 1;

  const paginatedRows = sortedRows.slice(
    (page - 1) * limit,
    page * limit
  );

  useEffect(() => {
    setPage(1);
  }, [query, limit]);

  /* ================= INLINE EDIT ================= */

  const startEdit = (rowId, colKey, value) => {

    if (colKey === "createdAt") return;

    setEditing({
      rowId,
      colKey,
      value: value ?? ""
    });

  };

  const cancelEdit = () => {
    setEditing({ rowId: null, colKey: null, value: "" });
  };

  const saveEdit = () => {

    const { rowId, colKey, value } = editing;

    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? { ...r, [colKey]: value }
          : r
      )
    );

    toast.success("Lead updated (local only)");

    cancelEdit();

  };

  /* ================= MESSAGE TRUNCATE ================= */

  const truncateMessage = (text, wordLimit = 15) => {

    if (!text) return "-";

    const words = text.split(" ");

    if (words.length <= wordLimit) return text;

    return words.slice(0, wordLimit).join(" ") + "...";

  };

  const visibleColumns = columns
    .filter((c) => c.visible !== false)
    .sort((a, b) => a.order - b.order);

  /* ================= RENDER ================= */

  return (

   <RequirePermission permission="lead.read">

  <section className="flex flex-col min-h-screen ml-4 bg-white dark:bg-slate-950 text-black dark:text-white">

    {/* HEADER */}

    <div className="sticky top-0 z-20 bg-white dark:bg-slate-900 p-4 flex justify-between border-b border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">

          <FiltersPanel columns={columns} onApply={() => {}} />

   <div className="flex gap-3 items-center">

  <TableConfigPanel tableKey="lead" />

  <Input
    placeholder="Search leads..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-64 bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-300 dark:border-slate-700 placeholder-gray-400 dark:placeholder-gray-500"
  />

</div>

        </div>

        {/* TABLE */}

  <div className="flex-1 overflow-auto border border-gray-200 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-black dark:text-white">

  <Table>

    <TableHeader>

      <TableRow className="border-b border-gray-200 dark:border-slate-700">

        <TableHead />

        {visibleColumns.map((c) => (

          <TableHead key={c.key} className="group text-gray-700 dark:text-gray-300">

            <div className="flex justify-between items-center">

              {c.label}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400">
                    <HiOutlineDotsVertical size={16} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-black dark:text-white">

                  <DropdownMenuItem
                    className="hover:bg-gray-100 dark:hover:bg-slate-800"
                    onClick={() => setSort({ key: c.key, dir: "asc" })}
                  >
                    Sort A → Z
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="hover:bg-gray-100 dark:hover:bg-slate-800"
                    onClick={() => setSort({ key: c.key, dir: "desc" })}
                  >
                    Sort Z → A
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>

            </div>

          </TableHead>

        ))}

      </TableRow>

    </TableHeader>

    <TableBody>

      {loading ? (

        <TableRow>
          <TableCell colSpan={visibleColumns.length + 1} className="text-gray-500 dark:text-gray-400">
            Loading...
          </TableCell>
        </TableRow>

      ) : paginatedRows.length === 0 ? (

        <TableRow>
          <TableCell colSpan={visibleColumns.length + 1} className="text-gray-500 dark:text-gray-400">
            No leads found
          </TableCell>
        </TableRow>

      ) : (

        paginatedRows.map((row) => (

          <TableRow
            key={row.id || row._id}
            className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900"
          >

            <TableCell>

              <div className="flex gap-2 items-center">

                <Checkbox />

                <FiInfo
                  className="cursor-pointer text-gray-400 dark:text-gray-500"
                  onClick={() => {
                    setPreviewItem(row);
                    setPreviewOpen(true);
                  }}
                />

              </div>

            </TableCell>

            {visibleColumns.map((c) => (

              <TableCell
                key={c.key}
                onDoubleClick={() => startEdit(row.id, c.key, row[c.key])}
                className="text-gray-700 dark:text-gray-300"
              >

                {editing.rowId === row.id && editing.colKey === c.key ? (

                  <div className="flex gap-2">

                    <Input
                      value={editing.value}
                      onChange={(e) =>
                        setEditing((s) => ({
                          ...s,
                          value: e.target.value,
                        }))
                      }
                      className="bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-300 dark:border-slate-700"
                    />

                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      ✔
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-600 dark:text-gray-300"
                      onClick={cancelEdit}
                    >
                      ✖
                    </Button>

                  </div>

                ) : c.key === "createdAt" ? (

                  row.createdAt
                    ? new Date(row.createdAt).toLocaleString()
                    : "-"

                ) : c.key === "message" ? (

                  <div className="max-w-xs line-clamp-2 break-words">
                    {truncateMessage(row.message)}
                  </div>

                ) : (

                  row[c.key] ?? "-"

                )}

              </TableCell>

            ))}

          </TableRow>

        ))

      )}

    </TableBody>

  </Table>

</div>
        {/* PAGINATION */}
<div className="sticky bottom-0 bg-white dark:bg-slate-900 p-4 flex justify-between items-center border-t border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300">

  <div>
    Page {page} of {totalPages}
  </div>

  <div className="flex gap-2 items-center">

    <select
      value={limit}
      onChange={(e) => setLimit(Number(e.target.value))}
      className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-black dark:text-white px-2 py-1 rounded"
    >
      {[10, 20, 50, 100].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>

    <Button
      disabled={page <= 1}
      onClick={() => setPage((p) => p - 1)}
      className="bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      Prev
    </Button>

    <Button
      disabled={page >= totalPages}
      onClick={() => setPage((p) => p + 1)}
      className="bg-white dark:bg-slate-800 text-black dark:text-white border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      Next
    </Button>

  </div>

</div>
        {/* PREVIEW DIALOG */}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>

  <DialogContent className="bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-200 dark:border-slate-700">

    <DialogHeader>
      <DialogTitle className="text-black dark:text-white">
        Lead Details
      </DialogTitle>
    </DialogHeader>

    {previewItem &&
      Object.entries(previewItem).map(([k, v]) => (

        <div key={k} className="text-sm mb-1 text-gray-700 dark:text-gray-300">

          <strong className="text-gray-900 dark:text-white">{k}:</strong>{" "}

          {k === "createdAt" && v
            ? new Date(v).toLocaleString()
            : String(v ?? "-")}

        </div>

      ))}

  </DialogContent>

</Dialog>
      </section>

    </RequirePermission>

  );

}