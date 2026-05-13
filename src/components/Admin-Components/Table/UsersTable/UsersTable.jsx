import Table from "../Table";

export default function UsersTable({
  users,
  loading,
  error,
  onEdit,
  onDelete,
  onView,
}) {
  const columns = [
    {
      key: "user",
      label: "User",
      render: (_value, u) => (
        <div>
          <p className="font-medium">
            {u.firstName} {u.lastName}
          </p>
          <p className="text-xs text-gray-400">ID: {u.id}</p>
        </div>
      ),
    },

    {
      key: "username",
      label: "Username",
      render: (value) => `@${value}`,
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "role",
      label: "Role",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_value, u) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onView(u)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition cursor-pointer"
          >
            <img
              src="https://images.icon-icons.com/839/PNG/512/page_view_icon-icons.com_66846.png"
              alt="view"
              className="w-7 h-7 object-contain"
            />
          </button>
          <button
            onClick={() => onEdit(u)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <img
              src="https://images.icon-icons.com/841/PNG/512/circle-edit-line_icon-icons.com_66940.png"
              alt="edit"
              className="w-7 h-7 object-contain"
            />
          </button>

          <button
            onClick={() => onDelete(u)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition cursor-pointer"
          >
            <img
              src="https://images.icon-icons.com/841/PNG/512/flat-style-circle-delete-trash_icon-icons.com_66945.png"
              alt="delete"
              className="w-7 h-7 object-contain"
            />
          </button>
        </div>
      ),
    },
  ];
  return (
    <Table columns={columns} data={users} loading={loading} error={error} />
  );
}
