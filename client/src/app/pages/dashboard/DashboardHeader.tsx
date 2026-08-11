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
  onAdd,
}: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-copper-100 pb-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl text-ink">{headerName}</h1>

        <span className="rounded-full bg-copper-50 px-2.5 py-1 text-xs font-semibold text-copper-700">
          {headerCount.toLocaleString()} مورد
        </span>
      </div>

      {/* Button */}
      <button
        className="flex items-center gap-2 rounded-xl bg-copper-600 px-5 py-2.5 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-copper-700"
        onClick={onAdd}
      >
        <FaPlus className="text-xs" />
        <span>{buttonText}</span>
      </button>
    </div>
  );
}

export default DashboardHeader;
