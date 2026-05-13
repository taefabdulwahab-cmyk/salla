export default function TableHeader({
  title,
  count,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="text-3xl">
          {title} {count}
        </p>
        <small className="text-gray-500">{description}</small>
      </div>

      <button
        onClick={onClick}
        className="px-4 py-2 bg-[#01252c] text-white rounded cursor-pointer hover:bg-gray-600 transition-colors duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
}
