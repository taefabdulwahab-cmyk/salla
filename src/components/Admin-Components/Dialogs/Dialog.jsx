import { useEffect } from "react";

export default function Dialog({
  open,
  onClose,
  children,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "primary",
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
  const variantStyles = {
    primary: "bg-black hover:bg-gray-800 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 animate-in fade-in zoom-in-95">
        <div className="flex flex-col gap-2 mb-10 bg-[#004A57] text-white p-4 rounded-lg">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}

          {description && <p className="text-sm ">{description}</p>}
        </div>

        <div>{children && children}</div>

        <div className="flex  gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 text-sm rounded-lg ${
                variantStyles[variant]
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
