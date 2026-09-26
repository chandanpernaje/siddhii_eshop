import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export const Header: React.FC = () => {
  const { totalItems, subtotal, openCart } = useCart();
  const { user, openAuthModal, openAccountModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/?search=${encodeURIComponent(searchQuery.trim())}#catalog`);
    setSearchOpen(false);
  };

  const navLinks = [
    { label: "Products", path: "/#catalog" },
    { label: "About Us", path: "/#about" },
    { label: "Contact", path: "/#contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white text-slate-900 border-b border-slate-200 shadow-sm relative backdrop-blur-xl">
        {/* Bottom glowing amber brand accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Official Siddhi Kabel Logo Lockup */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl"
            title="Siddhi Kabel - Authorized Industrial Distributor"
          >
            <div className="bg-white hover:bg-slate-50 px-2.5 sm:px-3.5 py-1.5 rounded-xl shadow-xs border border-slate-200 transition-all flex items-center justify-center">
              <img
                src="/images/siddhi-kabel-lockup.png"
                alt="Siddhi Kabel"
                className="h-8 sm:h-10 w-auto object-contain transition-transform hover:scale-102"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/images/siddhi-kabel-logo.png";
                }}
              />
            </div>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-800">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-colors py-1 hover:text-amber-600 ${
                  location.hash === link.path.replace("/", "")
                    ? "text-amber-600 font-bold"
                    : "text-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Search, Client Portal & Quotation Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 text-slate-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors flex items-center gap-2 border border-slate-200"
              title="Search industrial parts"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-600" />
              <span className="hidden xl:inline text-xs font-medium text-slate-500">Search catalog...</span>
            </button>

            {/* Account Profile / Login Button */}
            {user ? (
              <button
                onClick={openAccountModal}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 hover:bg-slate-200 transition-colors"
                title="Manage B2B Profile & RFQs"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="max-w-[110px] truncate font-medium">
                  {user.company || user.name}
                </span>
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal("signin")}
                  className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 hover:text-slate-900 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  Create Account
                </button>
              </div>
            )}

            {/* Quotation Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold transition-all group relative shadow-md shadow-amber-500/20 active:scale-95 border border-amber-400/40"
              aria-label="Quotation Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-slate-950 text-amber-400 border border-amber-500/60 font-black text-[9px] rounded-full w-4 h-4 flex items-center justify-center tabular-nums shadow-xs">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-100/90 leading-none">
                  Quotation Cart
                </span>
                <span className="text-[11px] font-mono font-black text-white tabular-nums">
                  ₹{subtotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 sm:p-2.5 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 border border-slate-200 flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 sm:px-6 py-4 space-y-3.5 shadow-xl text-slate-900">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAccountModal();
                  }}
                  className="text-xs font-semibold text-amber-600 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.company || user.name}</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("signin");
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("signup");
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Create Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Elegant Full Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-28 px-4" onClick={() => setSearchOpen(false)}>
          <div
            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-2xl p-5 space-y-4 relative animate-in fade-in zoom-in duration-150 text-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Search className="w-4 h-4 text-amber-600" />
                <span>Search Industrial Parts &amp; Cables</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter part #, cable size, plug rating (e.g. ÖLFLEX 110, PKZM0, CEE 32A)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shrink-0"
              >
                Search
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Popular Quick Searches:
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {["ÖLFLEX CLASSIC 110", "EATON PKZM0", "Mennekes 32A Plug", "Partex PA-1", "GST Proforma Quote"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/?search=${encodeURIComponent(term)}#catalog`);
                      setSearchOpen(false);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-amber-100 hover:text-amber-800 text-slate-700 rounded-lg transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
