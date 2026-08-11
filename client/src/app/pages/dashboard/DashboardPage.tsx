import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

function DashboardPage() {
  return (
    <div className="flex h-screen bg-cream-100">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
