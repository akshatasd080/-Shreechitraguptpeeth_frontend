// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import api from "../api/axios";
import { 
    Mail as FiMail, 
    Phone as FiPhone, 
    MapPin as FiMapPin, 
    User as FiUser, 
    Briefcase as FiBriefcase, 
    Calendar as FiCalendar, 
    UserCheck as FiUserCheck, 
    Clipboard as FiClipboard,
    Droplet as GiDrop,
    Building as FaBuilding,
    IdCard as FaIdBadge,
    Users as FaUsers,
    Building2 as FaOffice,
    Edit as MdEdit
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import ChangePasswordDialog from "@/components/common/ChangePasswordDialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import RequirePermission from "@/components/common/RequirePermission";
import { toast } from "react-hot-toast";
import { selectMyPermissions } from "../store/permissions/permissionsSlice";

/**
 * Role helpers:
 * - normalize role(s) from many possible shapes in `user`
 * - return array of role names (strings)
 */
function extractUserRoles(user) {
    if (!user) return [];
    // common shapes
    if (user.role && typeof user.role === "string") return [user.role];
    if (user.role && user.role.name) return [user.role.name];
    if (Array.isArray(user.roles)) {
        // elements might be strings or objects with 'name'
        return user.roles.map(r => (typeof r === "string" ? r : r.name || r.roleName)).filter(Boolean);
    }
    // try fallback properties
    if (user.roleName) return [user.roleName];
    if (user.rolesNames && Array.isArray(user.rolesNames)) return user.rolesNames;
    return [];
}

export default function Dashboard() {
    const user = useSelector((state) => state.auth.user) || {};
    const navigate = useNavigate();
    const myPermissions = useSelector(selectMyPermissions);
    const hasStatsPermission = myPermissions.includes('stats.read') || user?.role?.permissions?.some(p => p.name === 'stats.read');

    const [open, setOpen] = useState(false);
    // determine roles
    const userRoles = extractUserRoles(user).map(r => String(r).toLowerCase());
    const isSuperAdmin = userRoles.includes("superadmin") || userRoles.includes("super admin");
    const isAdmin = userRoles.includes("admin") || userRoles.includes("administrator");

    // User profile state (existing)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Admin stats state (for superadmin/admin)
    const [adminStats, setAdminStats] = useState(null);
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState(null);

    useEffect(() => {
        document.title = "Dashboard | Chapersons Services";
    }, []);

    // ---------- user data fetch ----------
    const fetchUserData = async (silent = false) => {
        if (!silent) setLoading(true);
        setError(null);
        try {
            const res = await api.get("/auth/me");
            setUserData(res.data.user);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Unable to fetch user data.");
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        // if user has NO stats permission, fetch profile info
        if (!hasStatsPermission) {
            fetchUserData();
        } else {
            // otherwise fetch admin stats
            fetchAdminStats();
        }
    }, [hasStatsPermission]);

    // ---------- admin stats fetch ----------
    const fetchAdminStats = async () => {
        setStatsLoading(true);
        setStatsError(null);
        try {
            const res = await api.get("/stats/admin-overview");
            setAdminStats(res.data);
        } catch (err) {
            console.error("Failed to fetch admin stats", err);
            setStatsError("Failed to load statistics.");
        } finally {
            setStatsLoading(false);
        }
    };

    // ---------- upload handler (same as your original) ----------
    const handleUpload = async () => {
        if (!profilePhoto) {
            setError("Please choose a file first.");
            return;
        }

        // Check file size (1MB limit)
        if (profilePhoto.size > 1024 * 1024) {
            const msg = "Image size too large. Image must be less than 1 MB.";
            toast.error(msg);
            setError(msg);
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const form = new FormData();
            form.append("photo", profilePhoto);

            const res = await api.post("/users/profile-picture", form, {});
            console.log("upload success:", res.data);
            fetchUserData(true);
            setProfileDialogOpen(false);
            setProfilePhoto(null);
            toast.success("Profile photo updated successfully");
        } catch (err) {
            console.error("upload error", err);
            if (err.response) {
                const msg = err.response.data?.message || "";
                const stack = err.response.data?.stack || "";
                if (stack.includes("File too large") || msg.includes("File too large") || msg.includes("too large")) {
                    const friendlyMsg = "Image size too large. Image must be less than 1 MB.";
                    toast.error(friendlyMsg);
                    setError(friendlyMsg);
                } else {
                    setError(`Upload failed: ${err.response.status} - ${msg || "Something went wrong"}`);
                }
            } else {
                setError("Upload failed. See console for details.");
            }
        } finally {
            setUploading(false);
        }
    };

    // helpers reused from your code


    const buildTiles = (d) => [
        { title: "Full Name", value: d?.name || "—", icon: <FiUser className="text-xl" /> },
        { title: "Email", value: d?.email || "—", icon: <FiMail className="text-xl" /> },
        { title: "Role", value: d?.Role?.name || d?.role?.name || "—", icon: <FiBriefcase className="text-xl" /> },
    ];

    // ---------- UI ----------
    return (
       <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-black dark:text-white">
            {/* Super Admin / Admin overview */}
            {hasStatsPermission ? (
                <RequirePermission permission="stats.read">
                    <section className="space-y-6 p-6">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Admin Overview
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Company-level statistics
      </p>
    </div>

    <div className="flex gap-2">
      <Button
        onClick={fetchAdminStats}
        className="px-4 py-2"
        disabled={statsLoading}
      >
        {statsLoading ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  </div>

  {/* Error */}
  {statsError && (
    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
      {statsError}
    </div>
  )}

  {/* Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Companies Card */}
    {/* <Link
      to="/companies"
      className="bg-white dark:bg-slate-900 rounded-lg p-5 shadow hover:shadow-lg transition cursor-pointer border dark:border-slate-700"
    >
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Companies
      </div>

      <div className="text-3xl font-semibold text-gray-900 dark:text-white">
        {adminStats
          ? adminStats.companiesCount ?? 0
          : statsLoading
          ? "..."
          : "—"}
      </div>

      <div className="text-sm text-gray-400 mt-1">
        Total companies
      </div>
    </Link> */}

    {/* Admins Card */}
    <Link
      to="/admins"
      className="bg-white dark:bg-slate-900 rounded-lg p-5 shadow hover:shadow-lg transition cursor-pointer border dark:border-slate-700"
    >
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Admins
      </div>

      <div className="text-3xl font-semibold text-gray-900 dark:text-white">
        {adminStats
          ? adminStats.adminsCount ?? 0
          : statsLoading
          ? "..."
          : "—"}
      </div>

      <div className="text-sm text-gray-400 mt-1">
        Users with admin privileges
      </div>
    </Link>

  </div>
</section>
                </RequirePermission>
            ) : (
                // ---------- User UI ----------

              <main className="p-6">
  <div>
    {/* Loading */}
    {loading && (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow text-center text-gray-700 dark:text-gray-300">
        Loading profile...
      </div>
    )}

    {/* Error */}
    {error && (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded mb-4">
        {error}
      </div>
    )}

    {/* No Data */}
    {!loading && !error && !userData && (
      <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow text-center text-gray-600 dark:text-gray-400">
        No profile data available.
      </div>
    )}

    {/* Profile */}
    {userData && (
      <div className="bg-gray-50 dark:bg-slate-950 overflow-hidden p-6 space-y-6 rounded-xl">

        {/* Welcome Section */}
        <section className="shadow-sm p-6 rounded-xl bg-white dark:bg-slate-900 flex justify-between flex-wrap gap-4">
          <h2 className="text-xl text-gray-800 dark:text-white">
            Welcome{" "}
            <span className="text-sky-500 font-semibold">
              {user?.name}
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <Button onClick={() => setOpen(true)}>
              Change Password
            </Button>
          </div>

          <ChangePasswordDialog
            open={open}
            onOpenChange={setOpen}
            onSuccess={() => console.log("changed")}
          />
        </section>

        {/* Profile Information */}
        <section className="shadow-sm p-6 rounded-xl bg-white dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl text-gray-800 dark:text-white">
              Profile Information
            </h2>
          </div>

          <div className="flex flex-col xl:flex-row gap-6">

            {/* Profile Image */}
            <div className="w-full lg:w-1/2 xl:w-1/4 mx-auto">
              <div className="p-6 flex flex-col items-center shadow-inner dark:shadow-none rounded-xl border dark:border-slate-700">

                <div className="w-full aspect-square rounded-lg overflow-hidden group relative">

                  <img
                    src={
                      userData?.profile_picture
                        ? `${import.meta.env.VITE_BASE_URL}/uploads/${userData.profile_picture}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={userData?.name || "User"}
                    className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                  />

                  {/* Edit Button */}
                  <div
                    onClick={() => setProfileDialogOpen(true)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <div className="bg-white dark:bg-slate-800 border border-sky-500 rounded-full p-2 cursor-pointer">
                      <MdEdit className="text-lg text-sky-500" />
                    </div>
                  </div>

                </div>

                <h2 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                  {userData?.name || "Unknown"}
                </h2>

              </div>
            </div>

            {/* Info Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 3xl:grid-cols-3 gap-4 flex-1">

              {buildTiles(userData).map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-xl p-4 border dark:border-slate-700 hover:shadow-md transition"
                >

                  <div className="shrink-0 w-12 h-12 rounded-lg bg-sky-50 dark:bg-slate-800 text-sky-500 flex items-center justify-center">
                    {t.icon}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm text-gray-400">
                      {t.title}
                    </div>

                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 break-words">
                      {t.value}
                    </div>
                  </div>

                </div>
              ))}

            </div>

          </div>
        </section>

      </div>
    )}
  </div>
</main>
            )}
           <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
  <DialogContent className="sm:max-w-md">
    
    <DialogHeader>
      <DialogTitle className="text-lg font-semibold">
        Add Profile Photo
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-5">

      {/* File Upload */}
      <div className="flex items-center gap-4">

        <label className="cursor-pointer inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium 
        bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700
        hover:bg-gray-100 dark:hover:bg-slate-800 transition">

          <span>Choose Photo</span>

          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => setProfilePhoto(e.target.files?.[0] ?? null)}
          />

        </label>

        {/* Preview */}
        {profilePhoto && (
          <div className="h-16 w-16 rounded-md border overflow-hidden bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
            <img
              src={URL.createObjectURL(profilePhoto)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">

        <Button
          variant="ghost"
          onClick={() => {
            setProfileDialogOpen(false)
            setProfilePhoto(null)
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleUpload}
          disabled={uploading || !profilePhoto}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>

      </div>

    </div>

  </DialogContent>
</Dialog>
        </div>
    );
}

