import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { RFQModal } from "../components/ui/RFQModal";

export const AboutMennekes: React.FC = () => {
  const [rfqTopic, setRfqTopic] = useState<string | null>(null);

  const productRanges = [
    {
      title: "PowerTOP® Xtra CEE Plugs & Connectors",
      desc: "Ergonomic rubberized grip with rotating cable gland, nickel-plated contacts, and IP54 to IP67 protection.",
      img: "/images/menn-powertop.jpg",
      topic: "MENNEKES POWERTOP XTRA",
    },
    {
      title: "Panel Mounted Sockets (Straight & Angled)",
      desc: "Robust 16A, 32A, 63A, and 125A receptacles with high heat resistant contact carrier and screwless twin contact technology.",
      img: "/images/menn-panel.jpg",
      topic: "MENNEKES PANEL SOCKETS",
    },
    {
      title: "AMAXX® Receptacle Combination Enclosures",
      desc: "Custom combinable distribution units in AMAPLAST housing with integrated DIN-rail MCBs, RCDs, and CEE outlets.",
      img: "/images/menn-amaxx.jpg",
      topic: "MENNEKES AMAXX COMBINATIONS",
    },
    {
      title: "DUO Interlocked Switched Sockets",
      desc: "Mechanical interlock prevents insertion or withdrawal of plugs under live electrical load. IP67 watertight.",
      img: "/images/menn-duo.jpg",
      topic: "MENNEKES DUO SWITCHED SOCKETS",
    },
    {
      title: "EverGUM® Solid Rubber Enclosures",
      desc: "Unbreakable vulcanized rubber distribution boxes designed for brutal mechanical abuse on shipyards and construction sites.",
      img: "/images/menn-evergum.jpg",
      topic: "MENNEKES EVERGUM ENCLOSURES",
    },
    {
      title: "Phase Inverters & Motor Sockets",
      desc: "Enables fast 180° rotation of two phase pins to reverse 3-phase motor direction without rewiring connections.",
      img: "/images/menn-phase.jpg",
      topic: "MENNEKES PHASE INVERTERS",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="w-full space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">Authorized Brands</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">MENNEKES Germany</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-mennekes.png"
                alt="Mennekes Logo"
                className="h-10 object-contain bg-slate-50 p-1.5 rounded-xl border border-slate-100"
              />
              <span className="text-xs uppercase font-mono text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Kirchhundem, Germany · Direct Industrial Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              MENNEKES Industrial Plugs &amp; Sockets
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              World standard in heavy duty CEE pin and sleeve connections. With over 80 years of German manufacturing mastery, Mennekes provides safe and reliable connections in demanding industrial plants, container ports, steel mills, and automated factory lines.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setRfqTopic("MENNEKES OEM BOX RATES")}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Request Direct Factory Box RFQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/quotation"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-amber-500" />
                <span>Go to Quotation Builder</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Ranges */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Mennekes Core Series
            </h2>
            <span className="text-xs text-slate-500 font-mono font-medium">
              IP44 &amp; IP67 Heavy Duty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productRanges.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:border-amber-500/60 transition-all hover:-translate-y-1 group shadow-xs hover:shadow-lg"
              >
                <div className="aspect-[16/10] bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative border-b border-slate-100">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/promo-mennekes.jpg";
                    }}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setRfqTopic(cat.topic)}
                      className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>Request Quotation</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] text-slate-400 font-mono font-bold">
                      Box Stock Ready
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <RFQModal
          productName={rfqTopic}
          isOpen={!!rfqTopic}
          onClose={() => setRfqTopic(null)}
        />
      </div>
    </div>
  );
};
