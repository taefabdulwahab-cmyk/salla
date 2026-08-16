import Button from "../button/Button";

import { useLanguage } from "../../context/LanguageContext";
export default function ProductCardLoading() {
  const { t } = useLanguage();
  return (
    <div className=" flex flex-col bg-white rounded-lg  items-center md:p-3 p-2 shadow-md  h-fit ">
      <div className=" flex  justify-center rounded-lg mb-1  ">
        <div className="w-25 h-25 sm:h-40 sm:w-40 md:h-50 md:w-50 bg-gray-200 animate-pulse flex items-center justify-center">
          {t("loading")}
        </div>
      </div>

      <div className="flex flex-col items-center justify-start gap-2 sm:gap-2 md:gap-3 lg:gap-3 w-full ">
        <div className="flex flex-col items-center justify-center gap-1  h-3 sm:h-3 md:h-5 lg:h-7 text-center w-full ">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="underline">
          <div className="h-3 sm:h-4 w-20  sm:w-30  md:w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full ">
        <div className="  m-2 sm:m-3 md:m-4 lg:m-4 text-md">
          <div className="h-3 sm:h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <Button className="w-full bg-[#01252c] rounded animate-pulse">
        <div className="h-3 sm:h-4 w-16"></div>
      </Button>
    </div>
  );
}
