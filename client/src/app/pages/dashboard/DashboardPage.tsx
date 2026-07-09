import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-100">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardPage;
