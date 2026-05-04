import Button from "../button/Button";

export default function ProductCardLoading() {
  return (
    <div className=" flex flex-col bg-white rounded-lg  items-center md:p-3 p-2   shadow-md  h-fit ">
      <div className=" flex  justify-center rounded-lg mb-2  ">
        <div className="w-full h-50 relative">
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            loading...
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-2 w-full  ">
        <div className="flex flex-col items-center justify-center gap-1 text-center w-full h-28">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="underline">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className=" m-4 text-md">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <Button className="w-full   bg-[#01252c] ">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </Button>
    </div>
  );
}
