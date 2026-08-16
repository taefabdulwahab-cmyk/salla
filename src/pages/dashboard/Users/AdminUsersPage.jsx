import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../api/API";
import UsersTable from "../../../components/Dashboard-Components/Admin - Components/Table/UsersTable/UsersTable";
import TableHeader from "../../../components/Dashboard-Components/Admin - Components/Table/TableHeader";
import Dialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/Dialog";
import AddUserForm from "../../../components/Dashboard-Components/Admin - Components/Admin-Form/users/AddUserForm";
import StatusMessage from "../../../components/Dashboard-Components/Admin - Components/Messages/StatusMessage";
import ViewUserDialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/ViewUserDialog";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { useOutletContext } from "react-router-dom";
export default function AdminUsersPage() {
  const { t } = useLanguage();
  const { search } = useOutletContext();

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

  const filteredUsers = data?.users?.filter((user) => {
    const searchValue = search.toLowerCase();

    return (
      String(user.id).toLowerCase().includes(searchValue) ||
      user.firstName?.toLowerCase().includes(searchValue) ||
      user.email?.toLowerCase().includes(searchValue) ||
      user.role?.toLowerCase().includes(searchValue)
    );
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
        message: t("userDeletedSuccessfully"),
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
        message: t("deleteFailed"),
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
        title={t("users")}
        count={filteredUsers?.length}
        description={t("manageYourUsers")}
        buttonText={t("addUser")}
        onClick={() => setOpenDialog(true)}
      />
      <UsersTable
        users={filteredUsers}
        loading={isLoading}
        error={error?.message}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={t("addUser")}
        description={t("manageYourUsers")}
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
        title={t("editUser")}
        description={t("updateUserInformation")}
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
        title={t("deleteUser")}
        description={t("areYouSureYouWantToDelete")}
        confirmText={t("delete")}
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
        title={t("userDetails")}
      />
    </div>
  );
}
