import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Clock } from "lucide-react";

export const TopBar: React.FC = () => {
  return (
    <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-800 py-1.5 sm:py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Mobile View ONLY: Show ONLY Contact Number & Email */}
        <div className="flex md:hidden items-center justify-center gap-3 w-full text-center py-0.5">
          <a
            href="tel:+919900048877"
            className="flex items-center gap-1.5 text-slate-900 font-bold hover:text-amber-600 transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-mono text-[11px]">+91 99000 48877</span>
          </a>

          <span className="text-slate-300 font-bold">•</span>

          <a
            href="mailto:sales@siddhikabel.com"
            className="flex items-center gap-1.5 text-slate-800 font-semibold hover:text-amber-600 transition-colors shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-[11px]">sales@siddhikabel.com</span>
          </a>
        </div>

        {/* Desktop View ONLY: Full unchanged top bar */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left Info Group */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Authorized B2B Industrial Stockist</span>
            </div>
            <div className="flex items-center gap-1.5 pl-3.5 border-l border-slate-300 text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Bangalore Dispatch: <strong className="text-slate-900 font-bold">Same-Day</strong></span>
            </div>
            <div className="flex items-center gap-1.5 pl-3.5 border-l border-slate-300 text-slate-700">
              <span className="text-slate-500 font-mono">GSTIN:</span>
              <span className="font-mono text-slate-900 font-bold">29AAYCS8872M1ZQ</span>
            </div>
          </div>

          {/* Right Contact & Location Group */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <a
              href="tel:+919900048877"
              className="flex items-center gap-1.5 hover:text-amber-600 transition-colors text-slate-900 font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono">+91 99000 48877</span>
            </a>
            <a
              href="mailto:sales@siddhikabel.com"
              className="flex items-center gap-1.5 hover:text-amber-600 transition-colors text-slate-700 font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>sales@siddhikabel.com</span>
            </a>
            <div className="flex items-center gap-1.5 pl-3.5 border-l border-slate-300 text-slate-800 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>SP Road, Bangalore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
