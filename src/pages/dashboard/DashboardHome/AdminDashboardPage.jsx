import { useContext } from "react";
import { UserContext } from "../../../context/UserContext.jsx";
import { Mail, ShieldCheck, User2 } from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#01252c]">{user?.firstName}</h1>

        <p className="text-gray-500 mt-1">Welcome back </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 max-w-xl">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#01252c] text-white flex items-center justify-center text-3xl font-bold shadow">
            <img src={user?.image} />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="text-sm text-gray-400">ID: {user?.id}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <User2 size={18} />
              <span>@{user?.username}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
