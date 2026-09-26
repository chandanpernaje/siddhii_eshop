import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RFQModal } from "../components/ui/RFQModal";

export const AboutLapp: React.FC = () => {
  const [rfqTopic, setRfqTopic] = useState<string | null>(null);

  const productFamilies = [
    {
      brand: "ÖLFLEX®",
      title: "Power and Control Cables",
      desc: "Oil-resistant, flexible PVC and PUR control cables for industrial machinery, motor feeds, and drag chains (CLASSIC 110, 110 SY, 110 CY, 400 P, FD 855 CP).",
      img: "/images/card-olflex.jpg",
      isOlflex: true,
      link: "/olflex-cables",
    },
    {
      brand: "UNITRONIC®",
      title: "Data Communication Cables",
      desc: "Screened data transmission cables with high EMC protection for sensors, instrumentation, RS485 serial communication, and industrial automation.",
      img: "/images/card-unitronic.jpg",
      topic: "Quote for UNITRONIC Cables",
    },
    {
      brand: "SKINTOP®",
      title: "Cable Glands & Accessories",
      desc: "Polyamide, nickel-plated brass, and stainless steel IP68/IP69K cable glands with integrated strain relief and vibration protection. Metric & PG threads.",
      img: "/images/card-skintop.jpg",
      topic: "Quote for SKINTOP Cable Glands",
    },
    {
      brand: "UNIPLUS®",
      title: "Cabinet Single Cores",
      desc: "Flexible single-core wires for control cabinets, panels, and internal machine wiring.",
      img: "/images/card-uniplus.jpg",
      topic: "Quote for UNIPLUS Single Cores",
    },
    {
      brand: "SILVYN®",
      title: "Rill, Conduit & Klick",
      desc: "Corrugated flexible conduits and connectors for mechanical and environmental protection.",
      img: "/images/card-conduit.jpg",
      topic: "Quote for SILVYN Conduits",
    },
    {
      brand: "LAPP INFRA",
      title: "Domestic / House Wiring",
      desc: "Flame-retardant FR-LSH building wires for residential and commercial installations.",
      img: "/images/card-infra.jpg",
      topic: "Quote for LAPP INFRA Building Wires",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/80 py-8 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="w-full space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">About LAPP India</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo-lapp.png"
                  alt="Lapp Group Logo"
                  className="h-10 object-contain"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    LAPP GROUP GERMANY
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    LAPP INDIA PRIVATE LIMITED
                  </h1>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Headquartered in Stuttgart, Germany, <strong className="text-slate-900">LAPP</strong> is a world leader in integrated cable and connection technology. As an official authorized channel partner in Bangalore, Siddhi Kabel Corporation Private Limited distributes the full spectrum of original Lapp solutions: <strong className="text-slate-900">ÖLFLEX®</strong> power and control cables, <strong className="text-slate-900">UNITRONIC®</strong> data transmission cables, <strong className="text-slate-900">ETHERLINE®</strong> industrial Ethernet, <strong className="text-slate-900">SKINTOP®</strong> cable glands, <strong className="text-slate-900">SILVYN®</strong> protective conduits, and <strong className="text-slate-900">LAPP INFRA</strong> building wires.
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[11px] tracking-wide uppercase shadow-2xs">
                AUTHORISED CHANNEL PARTNER
              </span>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4">
              <div className="text-xl font-black text-amber-600 font-mono">40,000+</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">Standard Catalogue SKUs</div>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4">
              <div className="text-xl font-black text-slate-900 font-mono">Stuttgart, GER</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">Global Engineering Origin</div>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4">
              <div className="text-xl font-black text-amber-600 font-mono">Bangalore Hub</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">Stock &amp; Immediate Dispatch</div>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4">
              <div className="text-xl font-black text-slate-900 font-mono">100% Genuine</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5">Mill Test Certs Provided</div>
            </div>
          </div>
        </div>

        {/* Product Families Section */}
        <div className="space-y-5">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            LAPP Brand Portfolio &amp; Product Families
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productFamilies.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                {/* Card Image Header */}
                <div className="aspect-[16/9] bg-slate-50 border-b border-slate-100 overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-102 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/images/card-olflex.jpg";
                    }}
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black uppercase font-mono text-amber-600 block mb-1">
                      {item.brand}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="pt-5 mt-4">
                    {item.isOlflex ? (
                      <Link
                        to="/olflex-cables"
                        className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>VIEW PRODUCTS →</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => setRfqTopic(item.topic || `Quote for ${item.brand} ${item.title}`)}
                        className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-xs"
                      >
                        REQUEST QUOTE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Bottom Footer Banner */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-lg">
          <div className="text-xs font-medium text-slate-300 text-center sm:text-left">
            Authorized Lapp Channel Partner: <strong className="text-white">Siddhi Kabel Corporation Private Limited</strong> • Banashankari 3rd Stage, Bangalore 560085 • Phone: 0962000947
          </div>
          <button
            onClick={() => setRfqTopic("Quote for LAPP FULL SCHEDULE / BOM")}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-md flex items-center gap-1.5"
          >
            <span>SUBMIT OFFICIAL RFQ / BOM →</span>
          </button>
        </div>

        {/* RFQ Modal */}
        <RFQModal
          productName={rfqTopic}
          isOpen={!!rfqTopic}
          onClose={() => setRfqTopic(null)}
        />
      </div>
    </div>
  );
};
