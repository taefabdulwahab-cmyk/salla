import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function StatusMessage({ message, type }) {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-87.5 text-center animate-in zoom-in-95">
        <div className="w-40 h-40 mx-auto">
          <DotLottieReact
            src={
              isSuccess
                ? "https://lottie.host/50aac8c7-d118-4cb0-b0ea-b3454d00e776/DooiktIcRU.lottie"
                : "https://lottie.host/1798524f-024d-45c3-8f00-65a1d7b2ec01/4yLpRAEP1J.lottie"
            }
            loop={false}
            autoplay
          />
        </div>

        <h2
          className={`text-2xl font-bold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Success" : "Error"}
        </h2>

        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </div>
  );
}
