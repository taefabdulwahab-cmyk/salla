import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../../../api/API";
import { Loader2 } from "lucide-react";
export default function AddUserForm({
  setOpenDialog,
  editData,
  setStatusMessage,
}) {
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
    age: "",
    role: "user",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newError = {};
    if (!form.firstName) newError.firstName = "First name is required";
    if (!form.email) newError.email = "Email is required";
    if (!form.password) newError.password = "Password is required";
    if (!form.age) newError.age = "Age is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: (newUser) => {
      if (editData) {
        return API.put(`/users/${editData.id}`, newUser);
      } else {
        return API.post("/users/add", newUser);
      }
    },
    onSuccess: async (res) => {
      if (editData) {
        console.log("UPDATED USER:", res.data);
      } else {
        console.log("User added successfully:", res.data);
      }
      setStatusMessage({
        type: "success",
        message: editData
          ? "User updated successfully"
          : "User added successfully",
      });
      // setOpenDialog(false);

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setTimeout(() => {
        setStatusMessage(null);
        setOpenDialog(false);
      }, 2000);
    },
    onError: (err) => {
      console.error("Error adding user:", err);
      setError({ submit: "Failed to add user. Please try again." });
      setStatusMessage({
        type: "error",
        message: "Something went wrong",
      });
      setTimeout(() => {
        setStatusMessage(null);
        setOpenDialog(false);
      }, 2000);
    },
  });

  const userIsSaving = userMutation.isPending;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      userMutation.mutateAsync(form);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };
  useEffect(() => {
    if (editData) {
      setForm({
        firstName: editData.firstName,
        email: editData.email,
        password: "",
        age: editData.age,
        role: editData.role,
      });
    }
  }, [editData]);
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>

        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.firstName && (
          <p className="text-red-500 text-xs mt-1">{error.firstName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.email && (
          <p className="text-red-500 text-xs mt-1">{error.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.password && (
          <p className="text-red-500 text-xs mt-1">{error.password}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            min="18"
            placeholder="Age"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
          />

          {error.age && (
            <p className="text-red-500 text-xs mt-1">{error.age}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
      </div>

      {error.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {error.submit}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={userIsSaving}
          className={`min-w-35  px-5 py-3 rounded-xl text-white font-medium flex items-center justify-center transition ${
            userIsSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#004A57] hover:bg-[#004A57]/80"
          }`}
        >
          {userIsSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {userIsSaving ? "Saving..." : "Save User"}
        </button>
      </div>
    </form>
  );
}
