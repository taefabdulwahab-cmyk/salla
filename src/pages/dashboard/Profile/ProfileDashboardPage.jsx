import { useContext } from "react";
import { UserContext } from "../../../context/UserContext.jsx";
import { Mail, ShieldCheck, User2 } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext.jsx";
export default function ProfileDashboardPage() {
  const { t } = useLanguage();
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="w-full p-6 ">
      <div className="mb-6 md:mb-8 ">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#01252c]">
          {user?.firstName}
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          {t("welcomeBack")}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 sm:p-6 w-full max-w-xl ">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-[#01252c] text-white flex items-center justify-center text-3xl font-bold shadow">
            <img
              src={user?.image}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
            <div>
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 truncate">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-xs sm:text-sm text-gray-400">ID: {user?.id}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} className="shrink-0" />
              <span className="text-sm sm:text-base truncate">
                {user?.email}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <User2 size={18} className="shrink-0" />
              <span className="text-sm sm:text-base truncate">
                @{user?.username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
