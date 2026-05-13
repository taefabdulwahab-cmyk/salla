import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API } from "../../../../api/API";
import { Loader2 } from "lucide-react";

export default function AddProductForm({
  setOpenDialog,
  setStatusMessage,
  editData,
}) {
  const [ProductForm, setProductForm] = useState({
    title: "",
    description: "",
    stock: "",
    price: "",
    category: "",
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await API.get("/products/categories");
      return res.data;
    },
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setProductForm({
      ...ProductForm,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newError = {};
    if (!ProductForm.title) newError.title = "title is required";
    if (!ProductForm.description)
      newError.description = "description is required";
    if (!ProductForm.stock) newError.stock = "stock is required";
    if (!ProductForm.price) newError.price = "price is required";
    if (!ProductForm.category) newError.category = "category is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: (newProduct) => {
      if (editData) {
        return API.put(`/products/${editData.id}`, newProduct);
      } else {
        return API.post("/products/add", newProduct);
      }
    },

    onSuccess: async (res) => {
      if (editData) {
        console.log("UPDATED PRODUCT:", res.data);
      } else {
        console.log("Product added successfully:", res.data);
      }

      setStatusMessage({
        type: "success",
        message: editData
          ? "Product updated successfully"
          : "Product added successfully",
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      setTimeout(() => {
        setStatusMessage(null);
        setOpenDialog(false);
      }, 2000);
    },

    onError: (err) => {
      console.error("Error adding products:", err);

      setError({
        submit: "Failed to save product. Please try again.",
      });

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

  useEffect(() => {
    if (editData) {
      setProductForm({
        title: editData.title,
        description: editData.description,
        stock: editData.stock,
        price: editData.price,
        category: editData.category,
      });
    }
  }, [editData]);

  const productIsSaving = productMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      productMutation.mutate(ProductForm);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={ProductForm.title}
          onChange={handleChange}
          placeholder="Enter Title"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.title && (
          <p className="text-red-500 text-xs mt-1">{error.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>

        <input
          type="text"
          name="description"
          value={ProductForm.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.description && (
          <p className="text-red-500 text-xs mt-1">{error.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>

        <input
          type="number"
          name="price"
          min="1"
          value={ProductForm.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
        />

        {error.price && (
          <p className="text-red-500 text-xs mt-1">{error.price}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            min="1"
            value={ProductForm.stock}
            onChange={handleChange}
            placeholder="stock"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
          />

          {error.stock && (
            <p className="text-red-500 text-xs mt-1">{error.stock}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>

          <select
            name="category"
            value={ProductForm.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004A57] transition"
          >
            <option value="">Select category</option>

            {categories?.map((cat, i) => (
              <option key={i} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {error.category && (
            <p className="text-red-500 text-xs mt-1">{error.category}</p>
          )}
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
          disabled={productIsSaving}
          className={`min-w-35 px-5 py-3 rounded-xl text-white font-medium flex items-center justify-center transition ${
            productIsSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#004A57] hover:bg-[#004A57]/80"
          }`}
        >
          {productIsSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

          {productIsSaving ? "Saving..." : "Save product"}
        </button>
      </div>
    </form>
  );
}
