import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "@/api/axios";
import { 
  Users as FiUsers,
  Search as FiSearch,
  Plus as FiPlus,
  Edit as FiEdit,
  Trash2 as FiTrash2,
  Mail as FiMail,
  Phone as FiPhone,
  Shield as FiShield
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-hot-toast";

export default function UserManagement() {
  const user = useSelector((state) => state.auth.user) || {};
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    roleId: ""
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update existing user
        await api.put(`/users/${editingUser.id}`, formData);
        toast.success("User updated successfully");
      } else {
        // Create new user
        await api.post("/users", formData);
        toast.success("User created successfully");
      }
      setDialogOpen(false);
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        mobile_number: "",
        password: "",
        roleId: ""
      });
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      toast.error(err.response?.data?.message || "Failed to save user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number || "",
      password: "",
      roleId: user.roleId || ""
    });
    setDialogOpen(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await api.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mobile_number?.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage system users and their roles
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingUser(null);
                setFormData({
                  name: "",
                  email: "",
                  mobile_number: "",
                  password: "",
                  roleId: ""
                });
              }}
              className="px-4 py-2"
            >
              <FiPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Mobile Number</label>
                <Input
                  type="tel"
                  value={formData.mobile_number}
                  onChange={(e) => setFormData({...formData, mobile_number: e.target.value})}
                  placeholder="Enter mobile number"
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Password</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    placeholder="Enter password"
                  />
                </div>
              )}
              <div>
                <label className="text-sm font-medium mb-1 block">Role ID</label>
                <Input
                  value={formData.roleId}
                  onChange={(e) => setFormData({...formData, roleId: e.target.value})}
                  placeholder="Enter role ID"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingUser ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search users by name, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-slate-700 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                          <FiUsers className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user.id?.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                          <FiMail className="h-4 w-4 mr-2 text-gray-400" />
                          {user.email}
                        </div>
                        {user.mobile_number && (
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiPhone className="h-4 w-4 mr-2 text-gray-400" />
                            {user.mobile_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <FiShield className="h-4 w-4 mr-2 text-gray-400" />
                        {user.Role?.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.is_active 
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <FiEdit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
