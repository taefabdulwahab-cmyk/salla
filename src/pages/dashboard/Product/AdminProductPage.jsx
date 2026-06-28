import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../api/API";
import ProductsTable from "../../../components/Dashboard-Components/Admin - Components/Table/ProductsTable/ProductsTable";
import TableHeader from "../../../components/Dashboard-Components/Admin - Components/Table/TableHeader";
import { useState } from "react";
import Dialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/Dialog";
import AddProductForm from "../../../components/Dashboard-Components/Admin - Components/Admin-Form/products/AddProductForm";
import StatusMessage from "../../../components/Dashboard-Components/Admin - Components/Messages/StatusMessage";
import ViewProductDialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/ViewProductDialog";

export default function AdminProductPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await API.get("/products");
      return res.data;
    },
    staleTime: SIX_HOURS,
    cacheTime: SIX_HOURS,
  });

  const handleView = (product) => {
    setSelectedProduct(product);
    setOpenViewDialog(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const queryClient = useQueryClient();

  const handleConfirmDelete = async (res) => {
    try {
      await API.delete(`/products/${selectedProduct.id}`);
      console.log("DELETED PRODUT:", res);

      setStatusMessage({
        type: "success",
        message: "Product deleted successfully",
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
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
        title="Products"
        count={data?.products?.length}
        description="manage your products"
        buttonText="+ Add Product"
        onClick={() => setOpenDialog(true)}
      />

      <ProductsTable
        products={data?.products}
        loading={isLoading}
        error={error?.message}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Add Product"
        description="Add a new Product"
        loading={false}
        children={
          <AddProductForm
            setOpenDialog={setOpenDialog}
            setStatusMessage={setStatusMessage}
          />
        }
      />

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        title="Edit Product"
        description="Update product information"
      >
        <AddProductForm
          setOpenDialog={setOpenEditDialog}
          setStatusMessage={setStatusMessage}
          editData={selectedProduct}
        />
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        title="Delete Product"
        description={`Are you sure you want to delete ${selectedProduct?.title}?`}
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

      <ViewProductDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        selectedProduct={selectedProduct}
        title="Product Details"
      />
    </div>
  );
}
