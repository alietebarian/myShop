import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
      >
        پرش به محتوای اصلی
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
