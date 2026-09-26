import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  FileText,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-850/60 py-10 px-4 lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">
                100% Genuine OEM Sourced
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Direct factory supply with manufacturer warranty, batch test reports, and compliance certificates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">
                Same-Day Bangalore Dispatch
              </h4>
              <p className="text-slate-400 leading-relaxed">
                25,000+ meters in stock across classic control cables, servo systems, and CEE power plugs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">
                Formal GST Commercial Quotations
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Instant project BOM pricing with tiered enterprise volume discounts and freight schedules.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">
                Dedicated Engineering Desk
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Cable sizing assistance, cross-reference part lookups, and technical CAD drawing support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full py-14 px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-2.5 rounded-xl inline-block shadow-sm">
            <img
              src="/images/siddhi-kabel-lockup.png"
              alt="Siddhi Kabel"
              className="h-10 w-auto object-contain"
            />
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            Premier stocking distributor and supply partner for industrial automation cables, switchgear, heavy-duty CEE connections, and marking technology across South India.
          </p>

          <div className="pt-2 text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono">GSTIN:</span>
              <span className="font-mono text-slate-200">29AAYCS8872M1ZQ</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-mono">PAN:</span>
              <span className="font-mono text-slate-200">AAYCS8872M</span>
            </div>
          </div>
        </div>

        {/* Col 2: Brand Portfolios */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wide">
            Authorized Brands
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/about-lapp" className="hover:text-amber-400 transition-colors">
                LAPP Kabel Stuttgart
              </Link>
            </li>
            <li>
              <Link to="/about-eaton" className="hover:text-amber-400 transition-colors">
                EATON Moeller Switchgear
              </Link>
            </li>
            <li>
              <Link to="/about-mennekes" className="hover:text-amber-400 transition-colors">
                MENNEKES Industrial Plugs
              </Link>
            </li>
            <li>
              <Link to="/about-partex" className="hover:text-amber-400 transition-colors">
                PARTEX Marking Systems
              </Link>
            </li>
            <li>
              <Link to="/olflex-cables" className="hover:text-amber-400 transition-colors">
                ÖLFLEX® Cable Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Product Categories */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wide">
            Product Catalogs
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/#catalog" className="hover:text-amber-400 transition-colors">
                ÖLFLEX® Flexible Control Cables
              </Link>
            </li>
            <li>
              <Link to="/#catalog" className="hover:text-amber-400 transition-colors">
                Industrial Ethernet &amp; PROFINET
              </Link>
            </li>
            <li>
              <Link to="/#catalog" className="hover:text-amber-400 transition-colors">
                CEE 16A/32A Watertight Plugs
              </Link>
            </li>
            <li>
              <Link to="/#catalog" className="hover:text-amber-400 transition-colors">
                Motor Starters &amp; Contactors
              </Link>
            </li>
            <li>
              <Link to="/#catalog" className="hover:text-amber-400 transition-colors">
                SKINTOP® Cable Gland Systems
              </Link>
            </li>
            <li>
              <Link to="/quotation" className="hover:text-amber-400 transition-colors font-medium text-amber-400">
                Official GST Quotation Page
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Corporate Contact */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-sm tracking-wide">
            Bangalore Sales Desk
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                No. 12/3, S.P. Road Cross, Bangalore - 560002, Karnataka, India
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="tel:+919900048877" className="hover:text-amber-400 transition-colors font-mono">
                +91 99000 48877
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href="mailto:sales@siddhikabel.com" className="hover:text-amber-400 transition-colors">
                sales@siddhikabel.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Mon - Sat: 9:30 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-6 px-4 lg:px-8">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} Siddhi Kabel. All Rights Reserved. ÖLFLEX®, UNITRONIC®, SKINTOP® are registered trademarks of LAPP Group.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/#about" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/#about" className="hover:text-slate-300 transition-colors">
              Terms of Supply
            </Link>
            <Link to="/quotation" className="hover:text-slate-300 transition-colors">
              B2B Quotations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
