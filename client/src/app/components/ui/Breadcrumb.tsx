import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

export interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-6 overflow-x-auto no-scrollbar">
      <ol className="flex items-center gap-1.5 text-sm whitespace-nowrap text-stone-500">
        {items.map((item, i) => (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 && <FiChevronLeft className="shrink-0 text-xs text-stone-400" aria-hidden />}
            <li>
              {item.to ? (
                <Link to={item.to} className="transition-colors hover:text-copper-700">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-ink-700" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
