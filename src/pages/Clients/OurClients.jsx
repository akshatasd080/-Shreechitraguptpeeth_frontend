// src/pages/OurClients.jsx

import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import {
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Users,
  Eye,

} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

const IMAGE_BASE_URL = API_BASE_URL + "/uploads/";

const OurClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [previewClient, setPreviewClient] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(6);
const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = limit;



 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
    image: null,
  });

  useEffect(() => {
    document.title = "Our Clients";
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);

    try {
      const res = await api.get("/our-clients");

      setClients(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (client = null) => {
    if (client) {
      setEditingClient(client);

      setFormData({
        name: client.name || "",
        description: client.description || "",
        is_active: client.is_active,
        image: null,
      });

      setImagePreview(
        client.image
          ? `${IMAGE_BASE_URL}${client.image}`
          : null
      );
    } else {
      setEditingClient(null);

      setFormData({
        name: "",
        description: "",
        is_active: true,
        image: null,
      });

      setImagePreview(null);
    }

    setDialogOpen(true);
  };

 const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Allowed image types
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  // File type validation
  if (!allowedTypes.includes(file.type)) {

    toast.error(
      "Only PNG, JPG, JPEG and WEBP images are allowed"
    );

    e.target.value = "";

    return;
  }

  // Max 1MB validation
  if (file.size > 1024 * 1024) {

    toast.error(
      "Image size must be less than 1MB"
    );

    e.target.value = "";

    return;
  }

  setFormData({
    ...formData,
    image: file,
  });

  const reader = new FileReader();

  reader.onloadend = () => {
    setImagePreview(reader.result);
  };

  reader.readAsDataURL(file);
};

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    const words = value
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length > 150) {
      setErrors((prev) => ({
        ...prev,
        description: "Maximum 150 words allowed",
      }));

      return;
    }

    setErrors((prev) => ({
      ...prev,
      description: "",
    }));

    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.description) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("is_active", formData.is_active);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editingClient) {
        await api.put(`/our-clients/${editingClient.id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Client updated successfully");
      } else {
        await api.post("/our-clients", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Client created successfully");
      }

      setDialogOpen(false);

      setFormData({
        name: "",
        description: "",
        is_active: true,
        image: null,
      });

      setImagePreview(null);

      fetchClients();

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this client?"
      )
    )
      return;

    try {
      await api.delete(`/our-clients/${id}`);

      toast.success("Client deleted successfully");

      fetchClients();

    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  const handleToggleActive = async (client) => {
    try {
      await api.put(`/our-clients/${client.id}`, {
        is_active: !client.is_active,
      });

      toast.success(
        `Client ${
          !client.is_active
            ? "activated"
            : "deactivated"
        } successfully`
      );

      fetchClients();

    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  //globle search filter
  const filteredClients = clients.filter((client) => {
  const search = searchTerm.toLowerCase();

  return (
    client.name?.toLowerCase().includes(search) ||
    client.description?.toLowerCase().includes(search) ||
    (client.is_active ? "active" : "inactive").includes(search)
  );
});

const totalPages = Math.max(
  1,
  Math.ceil(filteredClients.length / itemsPerPage)
);

const indexOfLastItem =
  currentPage * itemsPerPage;

const indexOfFirstItem =
  indexOfLastItem - itemsPerPage;

const currentClients =
  filteredClients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

   useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
}, [totalPages]);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, limit]);


  const truncateWords = (text, limit = 50) => {
    if (!text) return "No description available";

    const words = text.split(" ");

    if (words.length <= limit) return text;

    return (
      words.slice(0, limit).join(" ") + "..."
    );
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-slate-950 space-y-6">

      {/* Header */}

      
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
<div className="relative max-w-md">

  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

  <Input
    placeholder="Search clients..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="pl-12 h-12 rounded-2xl border-gray-200 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-slate-900 dark:border-slate-700"
  />

</div>

        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Client
        </Button>

      </div>

      {/* Empty State */}

   {!loading && filteredClients.length === 0 && (
        <Card className="dark:bg-slate-900 dark:border-slate-700">

          <CardContent className="flex flex-col items-center justify-center py-16">

            <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-full mb-4">
              <Users className="h-10 w-10 text-gray-500" />
            </div>

            <h2 className="text-xl font-semibold dark:text-white">
              No Clients Found
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Start by adding your first client
            </p>

            <Button
              className="mt-6"
              onClick={() => handleOpenDialog()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>

          </CardContent>

        </Card>
      )}

      {/* Cards */}

    {filteredClients.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

     {currentClients.map((client) => (

          <Card
  key={client.id}
  className={`overflow-hidden flex flex-col justify-between transition-all duration-300 rounded-2xl border dark:bg-slate-900 dark:border-slate-700 ${
    !client.is_active
      ? "opacity-60"
      : "hover:shadow-2xl hover:-translate-y-1"
  }`}
>

  {/* Image */}

  <div className="h-52 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">

    {client.image ? (
      <img
        src={`${IMAGE_BASE_URL}${client.image}`}
        alt={client.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <ImageIcon className="h-16 w-16 text-gray-400 opacity-20" />
      </div>
    )}

    {/* Status */}

    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md dark:bg-slate-900/90 px-3 py-1 rounded-full shadow border dark:border-slate-700 flex items-center gap-2">

      <span className="text-xs font-medium dark:text-white">
        {client.is_active
          ? "Active"
          : "Inactive"}
      </span>

      <Checkbox
        checked={client.is_active}
        onCheckedChange={() =>
          handleToggleActive(client)
        }
      />

    </div>
  </div>

  {/* Content */}

  <div className="flex flex-col flex-1">

    <CardHeader className="pb-2">

      <CardTitle className="dark:text-white text-lg line-clamp-1">
        {client.name}
      </CardTitle>

    </CardHeader>

    <CardContent className="flex-1">

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-6 min-h-[72px]">

        {truncateWords(client.description, 20)}

      </p>

    </CardContent>

    {/* Pagination */}


    {/* Footer */}

    <div className="border-t dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800">

      <div className="grid grid-cols-3 gap-2">

        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() =>
            setPreviewClient(client)
          }
        >
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() =>
            handleOpenDialog(client)
          }
        >
          <Edit2 className="h-4 w-4 mr-1" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="w-full text-red-500 hover:text-red-600"
          onClick={() =>
            handleDelete(client.id)
          }
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>

      </div>

    </div>

  </div>

</Card>
          ))}
        </div>
      )}


{filteredClients.length > 0 && (

  <div className="sticky bottom-0 z-20 p-4 bg-white dark:bg-slate-900 border-t dark:border-slate-700  flex flex-col md:flex-row items-center justify-between gap-4">

    {/* Left */}
    <div className="text-sm text-gray-600 dark:text-gray-300">
      Showing page {currentPage} of {totalPages} —{" "}
      {filteredClients.length} total clients
    </div>

    {/* Right */}
    <div className="flex items-center gap-3">

      {/* Per Page */}
      <div className="flex items-center gap-2">

        <label className="text-sm dark:text-gray-300">
          Per page:
        </label>

        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        >
          {[6, 12, 24, 48].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

      </div>

      {/* Prev */}
      <Button
        variant="outline"
        onClick={() =>
          setCurrentPage((p) =>
            Math.max(1, p - 1)
          )
        }
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      {/* Page Number */}
      <div className="min-w-[40px] text-center font-medium dark:text-white">
        {currentPage}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        onClick={() =>
          setCurrentPage((p) =>
            p < totalPages ? p + 1 : p
          )
        }
        disabled={currentPage === totalPages}
      >
        Next
      </Button>

    </div>

  </div>

)}

      

      {/* Add/Edit Dialog */}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >

     <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 dark:bg-slate-900 dark:border-slate-700">

  <div className="p-6 overflow-y-auto max-h-[90vh]">


          <DialogTitle className="text-xl dark:text-white">
            {editingClient
              ? "Edit Client"
              : "Add Client"}
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-4"
          >

            {/* Name */}

            <div className="space-y-2">

              <Label className="dark:text-gray-300">
                Client Name
              </Label>

              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter client name"
                required
              />

            </div>

            {/* Description */}

            <div className="space-y-2">

              <Label className="dark:text-gray-300">
                Description
              </Label>

              <Textarea
                rows={5}
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Enter description"
              />

              <div className="flex justify-between">

                {errors.description ? (
                  <p className="text-sm text-red-500">
                    {errors.description}
                  </p>
                ) : (
                  <div />
                )}

                <p className="text-xs text-gray-500">
                  {
                    formData.description
                      .trim()
                      .split(/\s+/)
                      .filter(Boolean).length
                  }{" "}
                  / 150 words
                </p>

              </div>
            </div>

            {/* Image */}

            <div className="space-y-2">

              <Label className="dark:text-gray-300">
                Client Image
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              <p className="text-xs text-gray-500">
                Max image size: 1MB
              </p>

              {imagePreview && (
                <div className="w-48 h-32 rounded-xl overflow-hidden border dark:border-slate-700 mt-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

            </div>

            {/* Active */}

            <div className="flex items-center gap-3">

              <Checkbox
                checked={formData.is_active}
                onCheckedChange={(value) =>
                  setFormData({
                    ...formData,
                    is_active: value,
                  })
                }
              />

              <Label className="dark:text-gray-300">
                Active
              </Label>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 pt-4">

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setDialogOpen(false)
                }
              >
                Cancel
              </Button>

              <Button type="submit">
                Save Client
              </Button>

            </div>

          </form>
            </div>
        </DialogContent>
    
      </Dialog>

      {/* Preview Dialog */}

     {/* Preview Dialog */}

<Dialog
  open={!!previewClient}
  onOpenChange={() =>
    setPreviewClient(null)
  }
>

  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 dark:bg-slate-900 dark:border-slate-700">

    <div className="p-6 overflow-y-auto max-h-[90vh]">

      <DialogTitle className="text-2xl dark:text-white">
        {previewClient?.name}
      </DialogTitle>

      {previewClient?.image && (
        <div className="w-full h-[400px] rounded-xl overflow-hidden mt-4">

          <img
            src={`${IMAGE_BASE_URL}${previewClient.image}`}
            alt={previewClient.name}
            className="w-full h-full object-cover"
          />

        </div>
      )}

      <div className="space-y-4 mt-5">

        <div className="flex items-center gap-3">

          <span className="font-semibold dark:text-white">
            Status:
          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              previewClient?.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {previewClient?.is_active
              ? "Active"
              : "Inactive"}
          </span>

        </div>

        <div>

          <h3 className="font-semibold mb-2 dark:text-white">
            Description
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-7 whitespace-pre-line">
            {previewClient?.description}
          </p>

        </div>

      </div>

    </div>

  </DialogContent>

</Dialog>

    </div>
  );
};
export default OurClients;