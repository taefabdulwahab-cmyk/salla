import { useEffect } from "react";

export default function ViewUserDialog({ open, onClose, selectedUser, title }) {
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
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7">
          <img
            src="https://images.icon-icons.com/1509/PNG/512/windowclose_104378.png"
            alt="close"
            className="w-full h-full"
          />
        </button>

        <h2 className="text-2xl font-bold text-[#01252c] mb-6">{title}</h2>

        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={
                selectedUser?.image ||
                "https://images.icon-icons.com/4157/PNG/512/profile_person_ux_account_ui_manual_user_icon_261591.png"
              }
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </h3>

            <p className="text-sm text-gray-400">ID: {selectedUser?.id}</p>
            <p className="text-gray-600">
              {selectedUser?.age} {selectedUser?.gender}
            </p>
            <p className="text-gray-600">{selectedUser?.email} </p>

            <p className="text-gray-600">@{selectedUser?.username}</p>

            <p className="text-gray-600 capitalize">{selectedUser?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
