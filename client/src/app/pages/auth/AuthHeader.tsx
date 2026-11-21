import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Logo from "../../components/ui/Logo";

/** Compact header for small screens (the brand panel is hidden there). */
function AuthHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-4 sm:px-8">
      <div className="lg:invisible">
        <Logo showTagline={false} />
      </div>
      <Link to="/" className="btn btn-ghost btn-sm">
        <FiArrowRight />
        بازگشت به فروشگاه
      </Link>
    </header>
  );
}

export default AuthHeader;
