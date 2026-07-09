import { FaPlus } from "react-icons/fa";

interface DashboardHeaderProps {
  headerName: string;
  headerCount: number;
  buttonText: string;

  onAdd: () => void;
}

function DashboardHeader({
  headerName,
  headerCount,
  buttonText,
  onAdd
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between bg-white p-4 shadow-sm border border-slate-200">
      {/* Title */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-slate-800">{headerName}</h1>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-slate-500">مجموع آیتم‌ها</span>

          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            {headerCount}
          </span>
        </div>
      </div>
      {/* Button */}
      <button
        className="
          flex items-center gap-2
          rounded-xl
          bg-amber-600
          px-5
          py-3
          text-white
          font-semibold
          shadow-md
          transition-all
          duration-200
          hover:bg-amber-700
          hover:shadow-lg
          active:scale-95
        "
        onClick={onAdd}
      >
        <FaPlus className="text-sm" />

        <span>{buttonText}</span>
      </button>
    </div>
  );
}

export default DashboardHeader;
