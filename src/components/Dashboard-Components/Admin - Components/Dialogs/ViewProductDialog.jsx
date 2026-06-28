import { useEffect } from "react";

export default function ViewProductDialog({
  open,
  onClose,
  selectedProduct,
  title = "Product Details",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="bg-white rounded-3xl p-6 w-full max-w-xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7">
          <img
            src="https://images.icon-icons.com/1509/PNG/512/windowclose_104378.png"
            alt="close"
            className="w-full h-full"
          />
        </button>
        <h2 className="text-2xl font-bold text-[#01252c] mb-6">{title}</h2>
        <div className="flex items-center gap-5">
          <div className="w-full h-full rounded-3xl overflow-hidden bg-gray-100 shadow mb-5">
            <img
              src={selectedProduct?.images}
              alt="product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {selectedProduct?.title}
            </h3>

            <p className="text-sm text-gray-500">ID: {selectedProduct?.id}</p>

            <p className="text-gray-600">{selectedProduct?.description}</p>

            <p className="text-gray-600">Price: {selectedProduct?.price} $</p>

            <p className="text-gray-600 capitalize">
              Category: {selectedProduct?.category}
            </p>
            <p className="text-gray-600 capitalize">
              Brand: {selectedProduct?.brand}
            </p>
            <p className="text-gray-600">Stock: {selectedProduct?.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
