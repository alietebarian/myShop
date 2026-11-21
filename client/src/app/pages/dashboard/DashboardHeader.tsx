import { FiPlus } from "react-icons/fi";
import { formatNumber } from "../../../lib/utils/format";

interface DashboardHeaderProps {
  headerName: string;
  headerCount: number;
  description?: string;
  buttonText: string;
  onAdd: () => void;
}

function DashboardHeader({ headerName, headerCount, description, buttonText, onAdd }: DashboardHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-ink">{headerName}</h1>
          <span className="rounded-lg bg-copper-50 px-2 py-0.5 text-xs font-semibold text-copper-700">
            {formatNumber(headerCount)}
          </span>
        </div>
        {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
      </div>

      <button type="button" className="btn btn-primary" onClick={onAdd}>
        <FiPlus className="text-base" />
        {buttonText}
      </button>
    </div>
  );
}

export default DashboardHeader;
