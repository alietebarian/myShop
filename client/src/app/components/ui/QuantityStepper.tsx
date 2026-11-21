import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { formatNumber } from "../../../lib/utils/format";
import Spinner from "./Spinner";

interface QuantityStepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  loading?: boolean;
  /** Show a trash icon instead of "−" when value is 1. */
  removeAtOne?: boolean;
  size?: "sm" | "md";
}

export default function QuantityStepper({
  value,
  onIncrease,
  onDecrease,
  max,
  loading,
  removeAtOne,
  size = "md",
}: QuantityStepperProps) {
  const h = size === "sm" ? "h-9" : "h-11";
  const btn = `flex ${h} w-10 items-center justify-center text-copper-700 transition-colors hover:bg-copper-50 disabled:cursor-not-allowed disabled:opacity-40`;

  return (
    <div className={`inline-flex ${h} items-center overflow-hidden rounded-xl border border-line bg-white`}>
      <button
        type="button"
        className={btn}
        onClick={onIncrease}
        disabled={loading || (max !== undefined && value >= max)}
        aria-label="افزایش تعداد"
      >
        <FiPlus />
      </button>

      <span className="flex w-10 items-center justify-center text-sm font-bold text-ink" aria-live="polite">
        {loading ? <Spinner className="h-4 w-4 text-copper-600" /> : formatNumber(value)}
      </span>

      <button
        type="button"
        className={`${btn} ${removeAtOne && value <= 1 ? "text-red-600 hover:bg-red-50" : ""}`}
        onClick={onDecrease}
        disabled={loading || (!removeAtOne && value <= 1)}
        aria-label={removeAtOne && value <= 1 ? "حذف از سبد" : "کاهش تعداد"}
      >
        {removeAtOne && value <= 1 ? <FiTrash2 /> : <FiMinus />}
      </button>
    </div>
  );
}
