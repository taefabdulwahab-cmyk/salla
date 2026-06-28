import Table from "../Table";

export default function ProductsTable({
  products,
  loading,
  error,
  onEdit,
  onDelete,
  onView,
}) {
  const columns = [
    {
      key: "product",
      label: "Product",
      render: (_value, p) => (
        <div className="flex items-center gap-3">
          <img src={p.thumbnail} className="w-10 h-10 rounded object-cover" />

          <div>
            <p className="font-medium">{p.title}</p>

            <p className="text-xs text-gray-400">ID: {p.id}</p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "price",
      label: "Price",
      render: (value) => `$${value}`,
    },

    {
      key: "stock",
      label: "Stock",
    },
    {
      key: "actions",
      label: "Actions",
      render: (_value, p) => (
        <div className="flex gap-2">
          <button
            onClick={() => onView(p)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 transition cursor-pointer"
          >
            <img
              src="https://images.icon-icons.com/839/PNG/512/page_view_icon-icons.com_66846.png"
              alt="view"
              className="w-7 h-7 object-contain"
            />
          </button>
          <button
            onClick={() => onEdit(p)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <img
              src="https://images.icon-icons.com/841/PNG/512/circle-edit-line_icon-icons.com_66940.png"
              alt="edit"
              className="w-7 h-7 object-contain"
            />
          </button>

          <button
            onClick={() => onDelete(p)}
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
    <Table
      columns={columns}
      data={products || []}
      loading={loading}
      error={error}
    />
  );
}
