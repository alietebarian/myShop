import { BiSearch } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { PiBasketLight } from "react-icons/pi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 40px",
        background: "white",
        borderBottom: "2px solid #f0f0f0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        direction: "rtl",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      {/* right side - Logo */}
      <Link to="/">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1.2,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "#b8860b",
              letterSpacing: "1px",
            }}
          >
            مس کده
          </span>
          <span style={{ fontSize: "11px", color: "#8b8b8b", fontWeight: 400 }}>
            ظروف و شمش مس
          </span>
        </div>
      </Link>

      {/* search section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f5f5f5",
          borderRadius: "30px",
          padding: "4px 4px 4px 15px",
          flex: 1,
          maxWidth: "400px",
          margin: "0 20px",
          border: "2px solid transparent",
          transition: "all 0.3s ease",
        }}
        className="group focus-within:bg-white focus-within:border-amber-700 focus-within:shadow-[0_0_0_4px_rgba(184,134,11,0.1)]"
      >
        <input
          type="text"
          placeholder="جستجو محصول..."
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            padding: "10px 12px",
            fontSize: "14px",
            outline: "none",
            color: "#333",
            fontFamily: "inherit",
          }}
          className="placeholder:text-gray-400"
        />
        <button
          style={{
            background: "#b8860b",
            border: "none",
            color: "white",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "18px",
          }}
          className="hover:bg-amber-800 hover:scale-105"
        >
          <BiSearch />
        </button>
      </div>

      {/* navigation items */}
      <div style={{ margin: "0 15px" }}>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "25px",
            padding: 0,
            margin: 0,
          }}
        >
          <li
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#b8860b",
              cursor: "pointer",
              padding: "6px 0",
              borderBottom: "3px solid #b8860b",
              transition: "all 0.3s ease",
            }}
          >
            ظروف مسی
          </li>
          <li
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#555",
              cursor: "pointer",
              padding: "6px 0",
              borderBottom: "3px solid transparent",
              transition: "all 0.3s ease",
            }}
            className="hover:text-amber-700"
          >
            شمش مس
          </li>
          <li
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#555",
              cursor: "pointer",
              padding: "6px 0",
              borderBottom: "3px solid transparent",
              transition: "all 0.3s ease",
            }}
            className="hover:text-amber-700"
          >
            صنعتی
          </li>
        </ul>
      </div>

      {/* left side - User actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* Admin */}
        <Link to='/dashboard'>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "20px",
            transition: "all 0.3s ease",
          }}
          className="hover:bg-gray-100"
          >
          <span style={{ fontSize: "13px", color: "#b8860b", fontWeight: 500 }}>
            پنل مدیریت
          </span>
          <RiAdminLine style={{ fontSize: "20px", color: "#b8860b" }} />
        </div>
          </Link>

        {/* Login */}
        <Link to='/login'>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "20px",
              transition: "all 0.3s ease",
            }}
            className="hover:bg-gray-100 group"
          >
            <span style={{ fontSize: "13px", color: "#555", fontWeight: 500 }}>
              ورود/ ثبت نام
            </span>
            <CiUser
              style={{
                fontSize: "20px",
                color: "#555",
                transition: "all 0.3s ease",
              }}
              className="group-hover:text-amber-700"
            />
          </div>
        </Link>

        {/* Cart */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "50%",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="hover:bg-gray-100 group"
        >
          <PiBasketLight
            style={{
              fontSize: "26px",
              color: "#555",
              transition: "all 0.3s ease",
            }}
            className="group-hover:text-amber-700 group-hover:scale-110"
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "#e74c3c",
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
            }}
          >
            0
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
