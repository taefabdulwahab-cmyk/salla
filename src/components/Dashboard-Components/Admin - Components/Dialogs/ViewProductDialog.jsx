import { useEffect } from "react";
import { useLanguage } from "../../../../context/LanguageContext.jsx";
export default function ViewProductDialog({
  open,
  onClose,
  selectedProduct,
  title = "Product Details",
}) {
  const { t } = useLanguage();
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 sm:p-5"
      onClick={onClose}
    >
      <div className="bg-white rounded-3xl  w-full max-w-xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 ltr:right-4 rtl:left-4 w-7 h-7"
        >
          <img
            src="https://images.icon-icons.com/1509/PNG/512/windowclose_104378.png"
            alt="close"
            className="w-full h-full"
          />
        </button>
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xltext-[#01252c]  font-bold mb-4">
            {title}
          </h2>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <div className="w-full h-full rounded-3xl overflow-hidden bg-gray-100 shadow mb-5">
              <img
                src={selectedProduct?.images}
                alt="product"
                className="w-full h-40 sm:h-56 object-contain"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 ">
                {selectedProduct?.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-500">
                ID: {selectedProduct?.id}
              </p>

              <p className="text-sm sm:text-base text-gray-600">
                {selectedProduct?.description}
              </p>

              <p className="text-sm sm:text-basetext-gray-600">
                Price: {selectedProduct?.price} $
              </p>

              <p className="text-sm sm:text-base text-gray-600 capitalize">
                Category: {selectedProduct?.category}
              </p>
              <p className="text-sm sm:text-base text-gray-600 capitalize">
                Brand: {selectedProduct?.brand}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Stock: {selectedProduct?.stock}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
