// src/pages/ApplyRequest.jsx

import React, { useEffect, useMemo, useState } from "react";
import {
  fetchApplyRequests,
  deleteApplyRequest,
  updateApplyRequest,
} from "@/api/applyRequests";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TableConfigPanel from "@/components/config/TableConfigPanel";
import FiltersPanel from "@/components/FiltersPanel";

import { Check, X, Trash, FileText } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FiInfo } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import api from "@/api/axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export default function ApplyRequest() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(new Set());

  const [editing, setEditing] = useState({
    rowId: null,
    key: null,
    value: ""
  });

  const [sort, setSort] = useState({
    key: "created_at",
    dir: "desc"
  });

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const limit = 10;

  const defaultColumns = [
    { key: "name", label: "Name", visible: true, order: 1 },
    { key: "email", label: "Email", visible: true, order: 2 },
    { key: "phone", label: "Phone", visible: true, order: 3 },
    { key: "cover_letter", label: "Cover Letter", visible: true, order: 4 },
    { key: "resume", label: "Resume", visible: true, order: 5 },
    { key: "created_at", label: "Created At", visible: true, order: 6 }
  ];

  useEffect(() => {

    loadTableConfig();

  }, []);


  useEffect(() => {

    setPage(1);

  }, [search]);


  const loadTableConfig = async () => {

    try {

      const res = await api.get("/table-configs?table=applyRequest");

      const registry = res?.data?.columns || [];
      const config = res?.data?.config?.config || [];

      if (config.length) {

        const ordered = config
          .sort((a, b) => a.order - b.order)
          .map((c) => {

            const reg = registry.find(r => r.key === c.key);

            return {
              key: c.key,
              label: reg?.label || c.key,
              visible: c.visible !== false,
              order: c.order
            }

          })

        setColumns(ordered)

      } else {

        setColumns(defaultColumns)

      }

    } catch {

      setColumns(defaultColumns)

    }

    fetchData()

  }



  const fetchData = async () => {

    try {

      setLoading(true)

      const res = await fetchApplyRequests()

      let rows = []

      if (Array.isArray(res)) rows = res
      else if (Array.isArray(res?.data)) rows = res.data
      else if (Array.isArray(res?.applyRequests)) rows = res.applyRequests

      setData(rows)

    } catch {

      toast.error("Failed to load data")

    } finally {

      setLoading(false)

    }

  }



  const processedData = useMemo(() => {

    let filtered = data.filter(row =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    )

    filtered.sort((a, b) => {

      const av = a[sort.key] || ""
      const bv = b[sort.key] || ""

      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av))

    })

    return filtered

  }, [data, search, sort])


  const totalPages = Math.max(1, Math.ceil(processedData.length / limit))
  const safePage = Math.min(page, totalPages)

  const pageData = processedData.slice(
    (safePage - 1) * limit,
    safePage * limit
  )


  const visibleColumns = columns
    .filter(c => c.visible)
    .sort((a, b) => a.order - b.order)



  const toggleOne = (id) => {

    const newSet = new Set(selected)

    newSet.has(id)
      ? newSet.delete(id)
      : newSet.add(id)

    setSelected(newSet)

  }



  const startEdit = (rowId, key, value) => {

    if (["resume", "created_at"].includes(key)) return

    setEditing({
      rowId,
      key,
      value: String(value || "")
    })

  }



  const cancelEdit = () => {

    setEditing({ rowId: null, key: null, value: "" })

  }



  const confirmEdit = async () => {

    try {

      const row = data.find(r => r.id === editing.rowId)

      const formData = new FormData()

      Object.keys(row).forEach(k => formData.append(k, row[k] || ""))

      formData.set(editing.key, editing.value)

      await updateApplyRequest(row.id, formData)

      setData(prev =>
        prev.map(r =>
          r.id === editing.rowId
            ? { ...r, [editing.key]: editing.value }
            : r
        )
      )

      toast.success("Updated successfully")

      cancelEdit()

    } catch {

      toast.error("Update failed")

    }

  }



  const handleDelete = async (id) => {

    if (!confirm("Delete this request?")) return

    await deleteApplyRequest(id)

    fetchData()

    toast.success("Deleted")

  }



  return (

   <div className="p-6 space-y-6 bg-white dark:bg-slate-900 min-h-screen">

  <div className="flex justify-between items-center">
    <FiltersPanel columns={columns} onApply={() => { }} />

    <div className="flex gap-2 items-center">
      <TableConfigPanel tableKey="applyRequest" onSaved={loadTableConfig} />

      <Input
        placeholder="Search..."
        className="w-60 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>


  <div className="border rounded-lg overflow-auto dark:border-slate-700">

    <Table>

      <TableHeader className="dark:bg-slate-900">

        <TableRow>

          <TableHead className="dark:text-gray-300">
            Select
          </TableHead>

          {visibleColumns.map(col => (
            <TableHead key={col.key} className="dark:text-gray-300">
              {col.label}
            </TableHead>
          ))}

          <TableHead className="dark:text-gray-300">
            Action
          </TableHead>

        </TableRow>

      </TableHeader>


      <TableBody>

        {loading ? (

          <TableRow>

            <TableCell
              colSpan="10"
              className="dark:text-gray-300"
            >
              Loading...
            </TableCell>

          </TableRow>

        ) : (

          pageData.map(row => (
            <TableRow
              key={row.id}
              className="dark:hover:bg-slate-800"
            >

              <TableCell>

                <div className="flex gap-2 items-center">

                  <Checkbox
                    checked={selected.has(row.id)}
                    onCheckedChange={() => toggleOne(row.id)}
                  />

                  <FiInfo
                    className="cursor-pointer text-gray-400 dark:text-gray-500"
                    onClick={() => {
                      setPreviewItem(row)
                      setPreviewOpen(true)
                    }}
                  />

                </div>

              </TableCell>


              {visibleColumns.map(col => (
                <TableCell
                  key={col.key}
                  onDoubleClick={() => startEdit(row.id, col.key, row[col.key])}
                  className="dark:text-gray-300"
                >

                  {editing.rowId === row.id && editing.key === col.key ? (

                    <div className="flex gap-2">

                      <Input
                        value={editing.value}
                        onChange={(e) =>
                          setEditing(s => ({
                            ...s,
                            value: e.target.value
                          }))
                        }
                        className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                      />

                      <Check
                        size={18}
                        className="text-green-600 cursor-pointer"
                        onClick={confirmEdit}
                      />

                      <X
                        size={18}
                        className="text-red-600 cursor-pointer"
                        onClick={cancelEdit}
                      />

                    </div>

                  ) : col.key === "resume" ? (

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        window.open(
                          `${BASE_URL}/uploads/resume/${row.resume}`,
                          "_blank"
                        )
                      }
                    >

                      <FileText size={16} />

                    </Button>

                  ) : col.key.includes("at") ? (

                    row[col.key]
                      ? new Date(row[col.key]).toLocaleString()
                      : "-"

                  ) : (

                    row[col.key]

                  )}

                </TableCell>
              ))}


              <TableCell>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(row.id)}
                >

                  <Trash size={14} />

                </Button>

              </TableCell>

            </TableRow>
          ))

        )}

      </TableBody>

    </Table>

  </div>


  <div className="flex justify-between dark:text-gray-300">

    <span>
      Page {safePage} of {totalPages}
    </span>

    <div className="flex gap-2">

      <Button
        disabled={safePage <= 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </Button>

      <Button
        disabled={safePage >= totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </Button>

    </div>

  </div>


  <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>

    <DialogContent className="dark:bg-slate-900 dark:border-slate-700">

      <DialogHeader>

        <DialogTitle className="dark:text-white">
          Apply Request Details
        </DialogTitle>

      </DialogHeader>

      {previewItem &&
        Object.entries(previewItem).map(([k, v]) => (
          <div key={k} className="text-sm dark:text-gray-300">

            <strong>{k}:</strong> {String(v)}

          </div>
        ))}

    </DialogContent>

  </Dialog>

</div>

  )

}