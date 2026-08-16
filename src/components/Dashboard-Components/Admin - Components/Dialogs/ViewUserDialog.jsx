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
          <div className="flex items-center gap-3 sm:gap-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#01252c] text-white flex items-center justify-center text-3xl font-bold shadow">
              <img
                src={
                  selectedUser?.image ||
                  "https://images.icon-icons.com/4157/PNG/512/profile_person_ux_account_ui_manual_user_icon_261591.png"
                }
                alt="user"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400">
                ID: {selectedUser?.id}
              </p>
              <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-600">
                {selectedUser?.age} {selectedUser?.gender}
              </p>
              <p className="text-sm sm:text-base truncate">
                {selectedUser?.email}
              </p>

              <p className="text-sm sm:text-base truncate">
                @{selectedUser?.username}
              </p>

              <p className="text-sm sm:text-base truncate capitalize">
                {selectedUser?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
