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
      bg-[#f4ecdf]
      "
      >
      {/* Header */}

      <div>
        <p className="text-xs tracking-[3px] text-[#b96b2c]">مسکده - از ۱۳۸۳</p>

        <h1 className="mt-6 font-display text-5xl leading-18 text-[#221a15]">
          به خانواده
          <br />
          <span className="text-[#b96b2c]">مس کده</span>
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
