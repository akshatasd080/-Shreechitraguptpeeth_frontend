import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function ApplyDialog() {

  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
const handleChange = (e) => {
  const { name, value } = e.target;

  // Name validation
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

  // Phone validation
  if (name === "phone") {
    if (!/^\d{0,10}$/.test(value)) return;
  }

  // Other fields
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};


  // Resume Upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);

      setErrors((prev) => ({
        ...prev,
        resume: "",
      }));
    }
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    }

    if (!fileName) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
    }
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#FF2E63] hover:bg-[#FF477E] text-white px-6 py-3 rounded-full font-medium transition shadow-md hover:shadow-lg">
          Apply Now <Send size={16} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl">

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Apply for Career
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-4">

          {/* Name */}
          <div>
            <Label>Name</Label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={errors.name ? "border-red-500" : ""}
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Resume Upload */}
          <div>
            <Label>Upload Resume (PDF / DOC / DOCX)</Label>

            <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer ${
              errors.resume ? "border-red-400" : "border-gray-300"
            }`}>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resumeUpload"
              />

              <label
                htmlFor="resumeUpload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <UploadCloud size={40} className="text-gray-400" />

                <span className="text-gray-600 text-sm">
                  {fileName || "Click to Upload Resume"}
                </span>
              </label>

            </div>

            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">{errors.resume}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>

            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={errors.email ? "border-red-500" : ""}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label>Phone</Label>

            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10 digit phone number"
              className={errors.phone ? "border-red-500" : ""}
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Cover Letter */}
          <div className="col-span-2">
            <Label>Cover Letter</Label>

            <Textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Write your cover letter..."
              className={`min-h-[120px] ${errors.coverLetter ? "border-red-500" : ""}`}
            />

            {errors.coverLetter && (
              <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-medium transition"
            >
              Submit Application
            </button>
          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
}