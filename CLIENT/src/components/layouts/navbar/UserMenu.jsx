import { Link } from "react-router-dom";
import {
  FiUser,
  FiShield,
  FiLogOut,
  FiChevronDown,
  FiPackage,
} from "react-icons/fi";
import { useAuthContext } from "../../../context/AuthContext";

const UserMenu = () => {
  const { userData, logout, sendVerificationOTP, isLoading } = useAuthContext();

  return (
    <div className="relative group">
      {/* --- THE TRIGGER BUTTON --- */}
      <button
        disabled={isLoading}
        className="flex items-center gap-2.5 p-1.5 pr-4 bg-[#3E2723] border border-white/10 rounded-full text-white shadow-lg hover:bg-[#4E342E] transition-all duration-300 group disabled:cursor-not-allowed"
      >
        <div className="w-8 h-8 bg-[#D7CCC8] rounded-full flex items-center justify-center text-[#3E2723] font-bold text-sm shadow-inner overflow-hidden">
          {isLoading ? (
            /* --- CSS SPINNER --- */
            <div className="w-4 h-4 border-2 border-[#3E2723]/20 border-t-[#3E2723] rounded-full animate-spin" />
          ) : userData ? (
            userData.name[0].toUpperCase()
          ) : (
            <FiUser size={16} />
          )}
        </div>

        <span className="text-[13px] font-medium tracking-wide">
          {isLoading ? (
            "Loading..."
          ) : (
            <>Mr. {userData && userData.name.split(" ")[0]}</>
          )}
        </span>

        <FiChevronDown
          size={14}
          className={`text-[#A1887F] transition-transform duration-500 ${
            !isLoading && "group-hover:rotate-180"
          }`}
        />
      </button>

      {/* --- THE DROPDOWN CARD --- */}
      <div className="absolute top-full right-0 pt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
        <div className="bg-[#2D1B13] border border-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Section: Header info */}
          <div className="px-5 py-4 bg-white/3 border-b border-white/5">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A1887F] mb-1">
              Private Lounge
            </p>
            <p className="text-sm font-semibold text-[#D7CCC8] truncate">
              {userData?.name}
            </p>
          </div>

          {/* Section: Links */}
          <div className="p-2">
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to="/orders"
              className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-[#D7CCC8] hover:bg-white/5 hover:text-white rounded-xl transition-all group/item"
            >
              <div className="p-1.5 bg-white/5 rounded-lg group-hover/item:bg-[#3E2723] transition-colors">
                <FiPackage
                  size={15}
                  className="text-[#A1887F] group-hover/item:text-white"
                />
              </div>
              My Orders
            </Link>

            {!userData?.isAccountVerified && (
              <div
                onClick={(e) => sendVerificationOTP(e)}
                className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium text-amber-200/70 hover:bg-amber-900/20 hover:text-amber-200 rounded-xl cursor-pointer transition-all group/item"
              >
                <div className="p-1.5 bg-amber-900/30 rounded-lg">
                  <FiShield size={15} className="text-amber-500" />
                </div>
                Verify Account
              </div>
            )}

            <div className="h-px bg-white/5 my-2 mx-2" />

            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-rose-400 hover:bg-rose-950/30 rounded-xl transition-all group/logout"
              onClick={(e) => logout(e)}
            >
              <div className="p-1.5 rounded-lg transition-colors">
                <FiLogOut size={15} />
              </div>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
