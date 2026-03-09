import React from "react";

export default function AuthHeader() {
  return (
    <>
      <div className="md:py-6 py-4  w-full ">
        <div className="flex flex-col items-center justify-center  gap-4  ">
          <div className="block w-20 h-20 mx-auto  border-4 p-2 border-[#A7F2E0] rounded-full">
            <img
              className="w-full h-full object-contain"
              src="https://cdn.salla.network/images/logo/logo-square.png"
              alt="Salla Logo"
            />
          </div>
          <div className="flex flex-col text-center justify-center mb-2">
            <h1 className="text-xl ">The Beautiful Experience Store</h1>
            <small className=" text-gray-400  ">
              Your Store for All Your Beautiful Experiences and Ideas{" "}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
