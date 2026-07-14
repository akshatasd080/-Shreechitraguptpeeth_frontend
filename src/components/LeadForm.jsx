import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import api from "@/api/axios";
import { Spinner } from "./ui/spinner";
import { toast } from "react-hot-toast";

export function LeadForm({ onSuccess, className = "" }) {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    mobile_number: "",
    service: "",
    message: "", // ✅ Added  
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/public");
        setServices(res.data?.data || res.data?.services || []);
      } catch (err) {
        console.error("Failed to fetch services");
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, name: value }));
      }
      return;
    }

    if (name === "mobile_number") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile_number: digits }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData((prev) => ({ ...prev, service: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.mobile_number)
      newErrors.mobile_number = "Mobile number is required";
    if (!formData.service) newErrors.service = "Please select a service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await api.post("/leads", formData);

      toast.success("Your request has been submitted successfully!");

      setFormData({
        name: "",
        email: "",
        company: "",
        mobile_number: "",
        service: "",
        message: "", // ✅ Reset
      });

      setErrors({});
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrors({
        submit:
          err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
  className={`bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6 relative text-black dark:text-white ${className}`}
>
  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Header */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Get Contact
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
        Fill details below.
      </p>
    </div>

    {/* Grid Start */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <Label className="text-gray-800 dark:text-gray-300">Full Name *</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Label className="text-gray-800 dark:text-gray-300">Email *</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Label className="text-gray-800 dark:text-gray-300">Mobile *</Label>
        <Input
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleChange}
          placeholder="9354589167"
          maxLength={10}
          className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700"
        />
        {errors.mobile_number && (
          <p className="text-red-500 text-xs mt-1">
            {errors.mobile_number}
          </p>
        )}
      </div>

      <div>
        <Label className="text-gray-800 dark:text-gray-300">Company</Label>
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700"
        />
      </div>

    </div>

    {/* Message */}
    <div>
      <Label className="text-gray-800 dark:text-gray-300">Message</Label>
      <Textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message (optional)..."
        rows={4}
        className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700"
      />
    </div>

    {/* Service */}
    <div>
      <Label className="text-gray-800 dark:text-gray-300">Service *</Label>

      <Select
        value={formData.service}
        onValueChange={handleServiceChange}
      >
        <SelectTrigger className="mt-1 bg-white dark:bg-slate-950 text-black dark:text-white border border-gray-300 dark:border-slate-700">
          <SelectValue placeholder="Select service" />
        </SelectTrigger>

        <SelectContent className="bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-200 dark:border-slate-700">
          {services.length > 0
            ? services.map((s) => (
                <SelectItem key={s.id} value={s.title} className="hover:bg-gray-100 dark:hover:bg-slate-800">
                  {s.title}
                </SelectItem>
              ))
            : ["Manufacturing", "Warehouse & Logistics", "Construction", "Security & Surveillance","Facility Management","Retail & Mall Operations","Hotels & Hospitality"].map(
                (item) => (
                  <SelectItem key={item} value={item} className="hover:bg-gray-100 dark:hover:bg-slate-800">
                    {item}
                  </SelectItem>
                )
              )}
        </SelectContent>
      </Select>

      {errors.service && (
        <p className="text-red-500 text-xs mt-1">{errors.service}</p>
      )}
    </div>

    {errors.submit && (
      <p className="text-red-500 text-xs">{errors.submit}</p>
    )}

   <Button
  type="submit"
  disabled={loading}
  className="w-full h-12 rounded-xl  bg-blue-500 hover:bg-blue-600 text-whitefont-semibold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading && <Spinner className="mr-2 h-4 w-4" />}
  Submit Request
</Button>

  </form>
</div>
  );
}