import AuthBaseItem from "./AuthBaseItem";
import { BiCheckShield, BiRefresh } from "react-icons/bi";
import { LuTruck } from "react-icons/lu";
import { MdOutlineDiscount } from "react-icons/md";

function AuthBase() {
  return (
    <div
      className="
      relative
      flex
      min-h-screen
      flex-col
      justify-between
      overflow-hidden
      p-16
      bg-cover
      bg-center
      bg-no-repeat
      bg-[#f0e2be]
      "
      >
      {/* Header */}

      <div>
        <p className="text-xs tracking-[3px] text-[#B56A2D]">مسکده - از ۱۳۸۳</p>

        <h1 className="mt-6 text-5xl font-black leading-18 text-[#1D1D1D]">
          به خانواده
          <br />
          <span className="text-[#C86B2A]">مس کده</span>
          <br />
          بپیوندید
        </h1>
      </div>

      {/* Features */}

      <div className="space-y-6">
        <AuthBaseItem
          icon={<BiCheckShield />}
          title="خرید امن"
          description="پرداخت با درگاه بانکی معتبر"
          />

        <AuthBaseItem
          icon={<LuTruck />}
          title="ارسال سریع"
          description="ارسال به سراسر ایران ظرف ۴۸ ساعت"
        />

        <AuthBaseItem
          icon={<BiRefresh />}
          title="ضمانت بازگشت"
          description="۷ روز ضمانت بازگشت کالا"
          />

        <AuthBaseItem
          icon={<MdOutlineDiscount />}
          title="تخفیف اعضا"
          description="دسترسی به کدهای تخفیف ویژه"
          />
      </div>
    </div>
  );
}

export default AuthBase;
