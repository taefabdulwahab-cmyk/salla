import React from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";

export default function AllUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await API.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <p className="text-3xl mb-5">Users {data?.users?.length}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch ">
        {data?.users?.map((u) => (
          <div
            key={u.id}
            className="flex flex-col justify-center items-center gap-2 mt-5 bg-gray-100 p-2 rounded-lg"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden  border border-gray-300">
              <img
                src={u.image}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-2 bg-white rounded-md shadow-md w-full text-center break-all">
              <p>{u.username}</p>
              <p>
                {u.firstName} {u.lastName}
              </p>
              <p>{u.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
