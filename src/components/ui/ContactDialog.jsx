import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

import api from "@/api/axios";
import { toast } from "react-hot-toast";

const ContactDialog = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile_number: "",
    service: "",
    message: "",
  });

  /* ================= FETCH SERVICES ================= */

const servicess = [
  "Solar Infrastructure",
  "Project Consultancy",
  "Utility Engineering",
  "Infrastructure Management",
];

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    // NAME VALIDATION
    if (name === "name") {

      const cleanValue = value.replace(/\s+/g, " ").trimStart();

      if (/^[A-Za-z\s]*$/.test(cleanValue)) {

        setFormData((prev) => ({
          ...prev,
          name: cleanValue,
        }));

        setErrors((prev) => ({
          ...prev,
          name: "",
        }));
      }

      return;
    }

    // MOBILE VALIDATION
    if (name === "mobile_number") {

      const digits = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        mobile_number: digits,
      }));

      setErrors((prev) => ({
        ...prev,
        mobile_number: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));

    setErrors((prev) => ({
      ...prev,
      service: "",
    }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.mobile_number)
      newErrors.mobile_number = "Mobile number required";

    if (formData.mobile_number.length !== 10)
      newErrors.mobile_number = "Mobile must be 10 digits";

    if (!formData.service)
      newErrors.service = "Select a service";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      await api.post("/contacts", {
        ...formData,
        message: formData.message || null,
      });

      toast.success("Request submitted successfully!");

      setFormData({
        name: "",
        email: "",
        company: "",
        mobile_number: "",
        service: "",
        message: "",
      });

      setErrors({});

    } catch (err) {

      setErrors({
        submit:
          err?.response?.data?.message ||
          "Something went wrong",
      });

    } finally {

      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (

<div className="bg-white border border-slate-200 rounded-3xl p-8 text-black [color-scheme:light]">

  <div className="text-center mb-8">

    <h2 className="text-3xl font-bold text-slate-900">
      Contact <span className="text-blue-500">Us</span>
    </h2>

    <p className="text-slate-600 text-sm mt-2">
      Share your project details and our team will contact you.
    </p>

  </div>

  <form onSubmit={handleSubmit} className="space-y-6 text-black">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      {/* NAME */}
      <div>

        <Label className="text-slate-700">
          Full Name *
        </Label>

        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          style={{ color: "#000", WebkitTextFillColor: "#000", caretColor: "#000" }}
          className="mt-1 h-11 !bg-white !border-slate-300 !text-black placeholder:!text-slate-400"
        />

        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name}
          </p>
        )}

      </div>

      {/* EMAIL */}
      <div>

        <Label className="text-slate-700">
          Email *
        </Label>

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your Email"
          style={{ color: "#000", WebkitTextFillColor: "#000", caretColor: "#000" }}
          className="mt-1 h-11 !bg-white !border-slate-300 !text-black placeholder:!text-slate-400"
        />

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email}
          </p>
        )}

      </div>

      {/* MOBILE */}
      <div>

        <Label className="text-slate-700">
          Mobile *
        </Label>

        <Input
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          placeholder="9354589167"
          style={{ color: "#000", WebkitTextFillColor: "#000", caretColor: "#000" }}
          className="mt-1 h-11 !bg-white !border-slate-300 !text-black placeholder:!text-slate-400"
        />

        {errors.mobile_number && (
          <p className="text-red-500 text-xs mt-1">
            {errors.mobile_number}
          </p>
        )}

      </div>

      {/* COMPANY */}
      <div>

        <Label className="text-slate-700">
          Company
        </Label>

        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          style={{ color: "#000", WebkitTextFillColor: "#000", caretColor: "#000" }}
          className="mt-1 h-11 !bg-white !border-slate-300 !text-black placeholder:!text-slate-400"
        />

      </div>

    </div>

    {/* MESSAGE */}
    <div>

      <Label className="text-slate-700">
        Message
      </Label>

      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your project details..."
        rows={4}
        style={{ color: "#000", WebkitTextFillColor: "#000", caretColor: "#000" }}
        className="mt-1 !bg-white !border-slate-300 !text-black placeholder:!text-slate-400"
      />

    </div>

    {/* SERVICE */}
    <div>

      <Label className="text-slate-700">
        Service *
      </Label>

      <Select
        value={formData.service}
        onValueChange={handleServiceChange}
      >

        <SelectTrigger
          style={{ color: "#000" }}
          className="mt-1 h-11 w-full !bg-white !border-slate-300 !text-black"
        >
          <SelectValue placeholder="Select service" />
        </SelectTrigger>

        <SelectContent className="!bg-white !text-black">

          {servicess.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className="!text-black focus:!bg-slate-100 focus:!text-black"
            >
              {item}
            </SelectItem>
          ))}

        </SelectContent>

      </Select>

      {errors.service && (
        <p className="text-red-500 text-xs mt-1">
          {errors.service}
        </p>
      )}

    </div>

    {errors.submit && (
      <p className="text-red-500 text-sm">
        {errors.submit}
      </p>
    )}

    <Button
      type="submit"
      disabled={loading}
      className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white"
    >

      {loading && <Spinner className="mr-2 h-4 w-4" />}

      Submit Request

    </Button>

  </form>

</div>
  );
};

export default ContactDialog;