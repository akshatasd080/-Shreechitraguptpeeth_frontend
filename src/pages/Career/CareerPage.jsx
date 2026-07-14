import React, { useEffect, useState } from "react";

import api from "@/api/axios";
import toast from "react-hot-toast";

import {
  Plus,
  Trash2,
  Edit2,
  Briefcase,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";

import { Badge } from "@/components/ui/badge";

import { Label } from "@/components/ui/label";

import { Spinner } from "@/components/ui/spinner";

const CareerPage = () => {

  const [careers, setCareers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [careerDialog, setCareerDialog] =
    useState(false);

  const [previewCareer, setPreviewCareer] =
    useState(null);

  const [editingCareer, setEditingCareer] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const [careerForm, setCareerForm] =
    useState({
      title: "",
      description: "",
      image: null,
      is_active: true,
      display_order: 0,
    });

  useEffect(() => {
    fetchCareers();
  }, []);

  // FETCH CAREERS
  const fetchCareers = async () => {
    try {

      setLoading(true);

      const res = await api.get(
        "/careers"
      );

      setCareers(res.data.data || []);

    } catch (error) {

      toast.error(
        "Failed to fetch careers"
      );

    } finally {

      setLoading(false);

    }
  };

  // OPEN DIALOG
  const openCareerDialog = (
    item = null
  ) => {

    if (item) {

      setEditingCareer(item);

      setCareerForm({
        title: item.title,
        description:
          item.description,
        image: null,
        is_active:
          item.is_active,
        display_order:
          item.display_order,
      });

      setImagePreview(item.image);

    } else {

      setEditingCareer(null);

      setCareerForm({
        title: "",
        description: "",
        image: null,
        is_active: true,
        display_order:
          careers.length,
      });

      setImagePreview("");

    }

    setCareerDialog(true);
  };

  // VALIDATION
  const validateForm = () => {

    let tempErrors = {};

    if (
      !careerForm.title.trim()
    ) {
      tempErrors.title =
        "Title is required";
    }

    if (
      !careerForm.description.trim()
    ) {
      tempErrors.description =
        "Description is required";
    }

    if (
      !editingCareer &&
      !careerForm.image
    ) {
      tempErrors.image =
        "Image is required";
    }

    setErrors(tempErrors);

    return (
      Object.keys(tempErrors)
        .length === 0
    );
  };

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      const payload =
        new FormData();

      Object.keys(careerForm).forEach(
        (key) => {

          if (
            careerForm[key] !== null
          ) {
            payload.append(
              key,
              careerForm[key]
            );
          }
        }
      );

      if (editingCareer) {

        await api.put(
          `/careers/${editingCareer.id}`,
          payload
        );

        toast.success(
          "Career updated successfully"
        );

      } else {

        await api.post(
          "/careers",
          payload
        );

        toast.success(
          "Career created successfully"
        );

      }

      setCareerDialog(false);

      fetchCareers();

    } catch (error) {

      console.error(error);

      toast.error("Failed");

    }
  };

  return (

    <div className="min-h-screen bg-white dark:bg-slate-950 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold dark:text-white">
            Career Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage career jobs and openings
          </p>

        </div>

        <Button
          onClick={() =>
            openCareerDialog()
          }
        >

          <Plus className="h-4 w-4 mr-2" />

          Add Career

        </Button>

      </div>

      {/* LOADING */}
      {loading ? (

        <div className="flex justify-center py-20">

          <Spinner className="h-12 w-12" />

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {careers.map((item) => (

            <Card
              key={item.id}
              className="overflow-hidden border-0 shadow-xl rounded-3xl dark:bg-slate-900"
            >

              {/* IMAGE */}
              <div className="relative h-[240px] overflow-hidden">

                {item.image ? (

                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/uploads/${item.image}`}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 duration-700"
                  />

                ) : (

                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">

                    <Briefcase className="w-20 h-20 text-gray-300" />

                  </div>

                )}

                {/* STATUS */}
                <div className="absolute top-4 right-4">

                  <Badge
                    className={
                      item.is_active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >

                    {item.is_active
                      ? "Active"
                      : "Inactive"}

                  </Badge>

                </div>

              </div>

              {/* CONTENT */}
              <CardContent className="p-6">

                <h2 className="text-2xl font-bold dark:text-white line-clamp-1">

                  {item.title}

                </h2>

                {/* DESCRIPTION */}
                <div className="mt-4 min-h-[90px]">

                  <p
                    onClick={() =>
                      setPreviewCareer(
                        item
                      )
                    }
                    className="text-sm leading-7 text-gray-600 dark:text-gray-400 line-clamp-3 cursor-pointer hover:text-primary transition"
                  >

                    {item.description}

                  </p>

                </div>

                {/* ACTIONS */}
                <div className="mt-6 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Switch
                      checked={
                        item.is_active
                      }
                      onCheckedChange={async (
                        val
                      ) => {

                        try {

                          const payload =
                            new FormData();

                          payload.append(
                            "is_active",
                            val
                          );

                          await api.put(
                            `/careers/${item.id}`,
                            payload
                          );

                          toast.success(
                            "Status updated"
                          );

                          fetchCareers();

                        } catch (error) {

                          toast.error(
                            "Failed"
                          );

                        }
                      }}
                    />

                    <span className="text-sm">

                      {item.is_active
                        ? "Enabled"
                        : "Disabled"}

                    </span>

                  </div>

                  <div className="flex gap-2">

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        openCareerDialog(
                          item
                        )
                      }
                    >

                      <Edit2 className="h-4 w-4 mr-1" />

                      Edit

                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {

                        if (
                          !window.confirm(
                            "Delete this career?"
                          )
                        )
                          return;

                        try {

                          await api.delete(
                            `/careers/${item.id}`
                          );

                          toast.success(
                            "Career deleted"
                          );

                          fetchCareers();

                        } catch (error) {

                          toast.error(
                            "Delete failed"
                          );

                        }
                      }}
                    >

                      <Trash2 className="h-4 w-4 mr-1" />

                      Delete

                    </Button>

                  </div>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      )}

      {/* CREATE / UPDATE DIALOG */}
      <Dialog
        open={careerDialog}
        onOpenChange={
          setCareerDialog
        }
      >

        <DialogContent className="sm:max-w-[600px] rounded-3xl p-0 overflow-hidden">

          {/* HEADER */}
          <div className="bg-primary px-6 py-5">

            <DialogHeader>

              <DialogTitle className="text-white text-2xl">

                {editingCareer
                  ? "Edit Career"
                  : "Add Career"}

              </DialogTitle>

            </DialogHeader>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >

            {/* BODY */}
            <div className="max-h-[75vh] overflow-y-auto p-6 space-y-5">

              {/* TITLE */}
              <div className="space-y-2">

                <Label>
                  Title
                </Label>

                <Input
                  placeholder="Career title"
                  value={
                    careerForm.title
                  }
                  onChange={(e) =>
                    setCareerForm({
                      ...careerForm,
                      title:
                        e.target.value,
                    })
                  }
                />

                {errors.title && (

                  <p className="text-red-500 text-sm">

                    {errors.title}

                  </p>

                )}

              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">

                <Label>
                  Description
                </Label>

                <Textarea
                  rows={5}
                  placeholder="Career description"
                  value={
                    careerForm.description
                  }
                  onChange={(e) =>
                    setCareerForm({
                      ...careerForm,
                      description:
                        e.target.value,
                    })
                  }
                />

                {errors.description && (

                  <p className="text-red-500 text-sm">

                    {errors.description}

                  </p>

                )}

              </div>

              {/* IMAGE */}
              <div className="space-y-2">

                <Label>
                  Upload Image
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {

                    setCareerForm({
                      ...careerForm,
                      image:
                        e.target
                          .files[0],
                    });

                    setImagePreview(
                      URL.createObjectURL(
                        e.target
                          .files[0]
                      )
                    );
                  }}
                />

                {imagePreview && (

                  <img
                    src={
                      imagePreview?.startsWith(
                        "blob:"
                      )
                        ? imagePreview
                        : `${import.meta.env.VITE_BASE_URL}/uploads/${imagePreview}`
                    }
                    alt=""
                    className="h-40 w-full object-cover rounded-2xl mt-4"
                  />

                )}

                {errors.image && (

                  <p className="text-red-500 text-sm">

                    {errors.image}

                  </p>

                )}

              </div>

              {/* ACTIVE */}
              <div className="border rounded-2xl p-4 flex items-center justify-between">

                <div>

                  <h3 className="font-medium">
                    Active Status
                  </h3>

                  <p className="text-sm text-gray-500">
                    Enable or disable
                  </p>

                </div>

                <Switch
                  checked={
                    careerForm.is_active
                  }
                  onCheckedChange={(
                    val
                  ) =>
                    setCareerForm({
                      ...careerForm,
                      is_active: val,
                    })
                  }
                />

              </div>

            </div>

            {/* FOOTER */}
            <DialogFooter className="border-t px-6 py-4">

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setCareerDialog(
                    false
                  )
                }
              >

                Cancel

              </Button>

              <Button type="submit">

                {editingCareer
                  ? "Update"
                  : "Create"}

              </Button>

            </DialogFooter>

          </form>

        </DialogContent>

      </Dialog>

      {/* PREVIEW DIALOG */}
      <Dialog
        open={!!previewCareer}
        onOpenChange={() =>
          setPreviewCareer(null)
        }
      >

        <DialogContent className="max-w-lg rounded-3xl overflow-hidden p-0">

          {/* IMAGE */}
          <div className="h-[220px] overflow-hidden relative">

            {previewCareer?.image ? (

              <img
                src={`${import.meta.env.VITE_BASE_URL}/uploads/${previewCareer?.image}`}
                alt=""
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full bg-gray-100 flex items-center justify-center">

                <Briefcase className="w-20 h-20 text-gray-300" />

              </div>

            )}

            <button
              onClick={() =>
                setPreviewCareer(
                  null
                )
              }
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >

              <X className="w-4 h-4" />

            </button>

          </div>

          {/* CONTENT */}
          <div className="p-6">

            <h2 className="text-2xl font-bold">

              {
                previewCareer?.title
              }

            </h2>

            <div className="mt-4 max-h-[250px] overflow-y-auto">

              <p className="text-sm leading-8 text-gray-600 dark:text-gray-300 whitespace-pre-line">

                {
                  previewCareer?.description
                }

              </p>

            </div>

          </div>

        </DialogContent>

      </Dialog>

    </div>
  );
};

export default CareerPage;