import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../api/API";
import ProductsTable from "../../../components/Dashboard-Components/Admin - Components/Table/ProductsTable/ProductsTable";
import TableHeader from "../../../components/Dashboard-Components/Admin - Components/Table/TableHeader";
import { useState } from "react";
import Dialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/Dialog";
import AddProductForm from "../../../components/Dashboard-Components/Admin - Components/Admin-Form/products/AddProductForm";
import StatusMessage from "../../../components/Dashboard-Components/Admin - Components/Messages/StatusMessage";
import ViewProductDialog from "../../../components/Dashboard-Components/Admin - Components/Dialogs/ViewProductDialog";
import { useLanguage } from "../../../context/LanguageContext.jsx";
import { useOutletContext } from "react-router-dom";

export default function AdminProductPage() {
  const { t } = useLanguage();
  const { search } = useOutletContext();

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
  const filteredProducts = data?.products?.filter((product) => {
    const searchValue = search.toLowerCase();
    return (
      String(product.id).toLowerCase().includes(searchValue) ||
      product.name?.toLowerCase().includes(searchValue) ||
      product.description?.toLowerCase().includes(searchValue)
    );
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
        message: t("productDeletedSuccessfully"),
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
        title={t("products")}
        count={filteredProducts?.length}
        description={t("manageYourProducts")}
        buttonText={t("addProduct")}
        onClick={() => setOpenDialog(true)}
      />

      <ProductsTable
        products={filteredProducts}
        loading={isLoading}
        error={error?.message}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title={t("addProduct")}
        description={t("addProductDescription")}
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
        title={t("editProduct")}
        description={t("updateProductInformation")}
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
        title={t("deleteProduct")}
        description={`"${t("areYouSureYouWantToDelete")}" ${selectedProduct?.title}?`}
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

      <ViewProductDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        selectedProduct={selectedProduct}
        title={t("productDetails")}
      />
    </div>
  );
}
