import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../api/API";
import UsersTable from "../../../components/Admin-Components/Table/UsersTable/UsersTable";
import TableHeader from "../../../components/Admin-Components/Table/TableHeader";
import Dialog from "../../../components/Admin-Components/Dialogs/Dialog";
import AddUserForm from "../../../components/Admin-Components/Admin-Form/users/AddUserForm";
import StatusMessage from "../../../components/Admin-Components/Messages/StatusMessage";
import ViewUserDialog from "../../../components/Admin-Components/Dialogs/ViewUserDialog";

export default function AdminUsersPage() {
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const [statusMessage, setStatusMessage] = useState(null);

  const SIX_HOURS = 6 * 60 * 60 * 1000;

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get("/users");
      return res.data;
    },
    staleTime: SIX_HOURS,
    cacheTime: SIX_HOURS,
  });
  const handleView = (user) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };
  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const queryClient = useQueryClient();

  const handleConfirmDelete = async (res) => {
    try {
      await API.delete(`/users/${selectedUser.id}`);
      console.log("DELETED USER:", res);

      setStatusMessage({
        type: "success",
        message: "User deleted successfully",
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      setTimeout(() => {
        setStatusMessage(null);
        setOpenDeleteDialog(false);
      }, 2000);
    } catch (err) {
      console.log(err);

      setStatusMessage({
        type: "error",
        message: "Delete failed",
      });

      setTimeout(() => {
        setStatusMessage(null);
        setOpenDeleteDialog(false);
      }, 2000);
    }
  };
  return (
    <div className="p-5">
      <TableHeader
        title="Users"
        count={data?.users?.length}
        description="manage your users"
        buttonText="+ Add User"
        onClick={() => setOpenDialog(true)}
      />
      <UsersTable
        users={data?.users}
        loading={isLoading}
        error={error?.message}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Add user"
        description="Add a new user"
        loading={false}
        children={
          <AddUserForm
            setOpenDialog={setOpenDialog}
            setStatusMessage={setStatusMessage}
          />
        }
      />

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        title="Edit User"
        description="Update user information"
      >
        <AddUserForm
          setOpenDialog={setOpenEditDialog}
          setStatusMessage={setStatusMessage}
          editData={selectedUser}
        />
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.firstName}?`}
        confirmText="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
      />

      {statusMessage && (
        <StatusMessage
          message={statusMessage.message}
          type={statusMessage.type}
        />
      )}

      <ViewUserDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        selectedUser={selectedUser}
        title="User Details"
      />
    </div>
  );
}
