import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { RFQModal } from "../components/ui/RFQModal";

export const AboutPartex: React.FC = () => {
  const [rfqTopic, setRfqTopic] = useState<string | null>(null);

  const productRanges = [
    {
      title: "PA Closed Chevron Wire Markers",
      desc: "Interlocking chevron cut ensures markers stay firmly locked and aligned in line. Self-extinguishing PVC to UL94-V0.",
      img: "/images/partex-pa.jpg",
      topic: "PARTEX PA CHEVRON WIRE MARKERS",
    },
    {
      title: "ProMark T-1000 Thermal Transfer Printer",
      desc: "Compact high-speed marking printer for profiles, heat shrink tubing, and continuous label tapes. 40mm/sec.",
      img: "/images/partex-promark.jpg",
      topic: "PARTEX PROMARK T-1000 PRINTER KIT",
    },
    {
      title: "PO & POZ Oval Marker Sleeves",
      desc: "Flexible oval profile designed to conform smoothly over individual wire cores. Halogen-free ZEROHEX version available.",
      img: "/images/partex-po.jpg",
      topic: "PARTEX PO SLEEVES",
    },
    {
      title: "PC Open-End Snap-On Wire Markers",
      desc: "Fast clip-on installation onto terminated wires and cables without disconnecting the terminal connections.",
      img: "/images/partex-pc.jpg",
      topic: "PARTEX PC SNAP-ON MARKERS",
    },
    {
      title: "PKS Stainless Steel Embossed Markers",
      desc: "Acid-proof AISI 316 stainless steel cable identification tags for aggressive offshore, chemical, and nuclear environments.",
      img: "/images/partex-pks.jpg",
      topic: "PARTEX PKS STAINLESS STEEL MARKERS",
    },
    {
      title: "Heavy Duty Cable Ties & Mounts",
      desc: "Polyamide 6.6 and stainless steel cable ties with rounded edges to prevent wire jacket cut-through.",
      img: "/images/partex-ties.jpg",
      topic: "PARTEX CABLE TIES",
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
          <span className="text-slate-900 font-bold">PARTEX Sweden</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 relative overflow-hidden shadow-lg">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-partex.png"
                alt="Partex Logo"
                className="h-10 object-contain bg-slate-50 p-1.5 rounded-xl border border-slate-100"
              />
              <span className="text-xs uppercase font-mono text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Gullspång, Sweden · Official Marking Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              PARTEX Marking Systems
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Industrial cable, wire and component marking systems engineered in Sweden since 1948. Complete marking solutions trusted by control panel builders, switchgear OEMs, telecom installations, and electrical contractors worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => setRfqTopic("PARTEX FREE SAMPLE KIT")}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Request Free Sample Marking Kit</span>
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
              Partex Marking Solutions
            </h2>
            <span className="text-xs text-slate-500 font-mono font-medium">
              Swedish Precision Identification
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
                      target.src = "/images/promo-partex.jpg";
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
                      Pack Stocks Ready
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
