import React, { useState, useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Plus,
  Minus,
  ArrowRight,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
} from "lucide-react";
import { PRODUCTS_DATA, ALL_OLFLEX_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { RFQModal } from "../components/ui/RFQModal";
import { ImageZoomModal } from "../components/ui/ImageZoomModal";

export const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id: string }>();
  const searchParams = new URLSearchParams(location.search);
  const productId = routeId || searchParams.get("id") || "lapp-01";

  const product = useMemo(() => {
    // 1. Direct match in PRODUCTS_DATA by ID
    const foundDirect = PRODUCTS_DATA.find((p) => p.id === productId);
    if (foundDirect) return foundDirect;

    // 2. Match in PRODUCTS_DATA by Part Number
    const foundByPartNo = PRODUCTS_DATA.find(
      (p) => p.partNo.toLowerCase() === productId.toLowerCase()
    );
    if (foundByPartNo) return foundByPartNo;

    // 3. Match in ALL_OLFLEX_PRODUCTS by Part Number
    const olflexMatch = ALL_OLFLEX_PRODUCTS.find(
      (p) => p.partNo.toLowerCase() === productId.toLowerCase()
    );
    if (olflexMatch) {
      return {
        id: `olflex-${olflexMatch.partNo}`,
        category: "cables" as const,
        brand: "LAPP KABEL",
        partNo: olflexMatch.partNo,
        name: olflexMatch.name,
        specs: [
          `Cores: ${olflexMatch.core} Cores (${olflexMatch.pe === "G" ? "With Yellow/Green Earth" : "Black Numbered Cores"})`,
          `Cross Section: ${olflexMatch.size} mm² (Flexible bare copper Class 5)`,
          `Outer Diameter: ${olflexMatch.outerDia ? `${olflexMatch.outerDia} mm` : "Approx. 6.3 mm"}`,
          `Copper Index: ${olflexMatch.copperIndex ? `${olflexMatch.copperIndex} kg/km` : "Approx. 28.8 kg/km"}`,
          `Weight: ${olflexMatch.weight ? `${olflexMatch.weight} kg/km` : "Approx. 75 kg/km"}`,
          `Test Voltage: 4000 V · Temp: -40°C to +80°C static / -5°C to +70°C flexing`,
        ],
        voltage: "300/500 V",
        tempRange: "-40°C to +80°C static / -5°C to +70°C flexing",
        conductor: "Fine-wire strands of bare copper (IEC 60228 Class 5)",
        price: olflexMatch.price,
        unit: "meter" as const,
        stock: "Bangalore Central Hub (In Stock - Ready Cut)",
        icon: "cable",
        application: "Oil-resistant, flexible control and power cable for machine tools, assembly lines, automation, and control cabinets (VDE 7030 / IEC 60332-1-2 flame retardant).",
        image: "/images/cable-olflex-thumb.png",
        hsnCode: "85444990",
      };
    }

    return PRODUCTS_DATA[0];
  }, [productId]);

  const [qty, setQty] = useState(product.unit === "meter" ? 100 : 1);
  const [selectedImg, setSelectedImg] = useState("/images/cable-olflex-thumb.png");
  const [rfqOpen, setRfqOpen] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [inlineZoom, setInlineZoom] = useState(1);

  React.useEffect(() => {
    if (product) {
      setQty(product.unit === "meter" ? 100 : 1);
    }
  }, [product]);

  const { addToCart, cart } = useCart();
  const { showToast } = useToast();

  const handleStepUp = () => {
    if (product.unit === "meter") {
      setQty((q) => {
        if (q < 100) return 100;
        if (q === 100 || q === 101 || q === 102 || q < 125) return 125;
        return Math.floor(q / 25) * 25 + 25;
      });
    } else {
      setQty((q) => q + 1);
    }
  };

  const handleStepDown = () => {
    if (product.unit === "meter") {
      setQty((q) => {
        if (q > 125) return Math.ceil(q / 25) * 25 - 25;
        if (q <= 125 && q > 100) return 100;
        if (q === 100) return 75;
        return Math.max(25, q - 25);
      });
    } else {
      setQty((q) => Math.max(1, q - 1));
    }
  };

  const galleryImages = [
    { src: "/images/cable-olflex-thumb.png", label: "Main Profile" },
    { src: "/images/cable-olflex-angle.png", label: "Angle View" },
    { src: "/images/cable-olflex-cores.png", label: "Numbered Cores" },
    { src: "/images/cable-olflex-detail.png", label: "Cross Section" },
    { src: "/images/cable-olflex-drum.png", label: "Wooden Drum" },
  ];

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleInstantQuote = () => {
    addToCart(product, qty);
    navigate("/quotation");
  };

  const lineTotal = product.price * qty;
  const gstLine = lineTotal * 0.18;
  const totalWithGst = lineTotal + gstLine;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="w-full space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <Link to="/#catalog" className="hover:text-amber-600 transition-colors font-medium">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-amber-700 font-bold">{product.brand}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">
            {product.partNo}
          </span>
        </div>

        {/* Contiguous PDP Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & High-Res Inspection (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 flex items-center justify-center aspect-square relative overflow-hidden shadow-lg group">
              <div
                className="w-full h-full flex items-center justify-center cursor-zoom-in overflow-hidden"
                onClick={() => setIsZoomModalOpen(true)}
              >
                <img
                  src={selectedImg}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${inlineZoom})`,
                    transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  className="max-h-80 object-contain drop-shadow-sm select-none"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = product.image || "/images/card-olflex.jpg";
                  }}
                />
              </div>

              {/* Ready Stock badge */}
              <div className="absolute top-4 left-4 text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs pointer-events-none">
                {product.stock}
              </div>

              {/* Interactive Zoom Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-1.5 shadow-xl backdrop-blur-md z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInlineZoom((prev) => Math.max(prev - 0.25, 1));
                  }}
                  disabled={inlineZoom <= 1}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-amber-400 px-1.5 tabular-nums min-w-[40px] text-center">
                  {Math.round(inlineZoom * 100)}%
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInlineZoom((prev) => Math.min(prev + 0.25, 2.5));
                  }}
                  disabled={inlineZoom >= 2.5}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-40 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {inlineZoom > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setInlineZoom(1);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Reset Zoom (100%)"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                )}
                <div className="h-4 w-px bg-slate-700 mx-0.5" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomModalOpen(true);
                  }}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px] font-bold"
                  title="Open Fullscreen Lightbox (+/- zoom)"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Zoom Full</span>
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img.src)}
                  className={`aspect-square rounded-2xl bg-white border p-2 flex items-center justify-center transition-all ${
                    selectedImg === img.src
                      ? "border-amber-500 shadow-md scale-95 ring-2 ring-amber-500/20"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="max-h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Quick Fact sheet */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 text-xs shadow-2xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Authorized Distribution Compliance</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Supplied under official warranty directly from LAPP Kabel / EATON manufacturing plants. Test reports and factory inspection certificates are issued with every dispatch drum.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-mono text-slate-400 mb-2 font-bold">
                <span className="text-amber-600">{product.brand}</span>
                <span>·</span>
                <span>Part No: {product.partNo}</span>
                {product.hsnCode && (
                  <>
                    <span>·</span>
                    <span>HSN: {product.hsnCode}</span>
                  </>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                {product.application}
              </p>

              {/* Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs mb-6">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-baseline gap-2 text-slate-700 font-medium">
                    <span className="text-amber-500 text-xs font-mono font-bold">✓</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Meter / Quantity Calculator */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase font-mono text-slate-400 font-bold block">
                    Contract Rate (Ex-GST)
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-slate-900 tabular-nums">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      /{product.unit}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-400 font-bold block">
                    GST Rate
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800">
                    18% (ITC Eligible)
                  </span>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Required Quantity ({product.unit}s)</span>
                  <span className="text-slate-400 font-mono">
                    Standard Reel / Unit Pack
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1.5 flex-1">
                    <button
                      onClick={handleStepDown}
                      className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
                      title={product.unit === "meter" ? "Decrease by 25m" : "Decrease"}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={product.unit === "meter" ? "25" : "1"}
                      step={product.unit === "meter" ? "25" : "1"}
                      value={qty}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 1;
                        if (product.unit === "meter" && (val === 101 || val === 102)) {
                          setQty(125);
                        } else {
                          setQty(Math.max(1, val));
                        }
                      }}
                      className="w-full bg-transparent text-center font-mono font-bold text-base text-slate-900 focus:outline-none"
                    />
                    <button
                      onClick={handleStepUp}
                      className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200"
                      title={product.unit === "meter" ? "Increase by 25m (e.g. 100m -> 125m)" : "Increase"}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Preset quick buttons */}
                  {product.unit === "meter" && (
                    <div className="flex flex-wrap gap-1.5">
                      {[100, 125, 250, 500, 1000].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setQty(preset)}
                          className={`px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-colors ${
                            qty === preset
                              ? "bg-amber-50 border-amber-400 text-amber-700 shadow-2xs"
                              : "border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {preset}m
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Cost Projection */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Line Taxable Total:</span>
                  <span className="font-mono text-slate-900 font-bold tabular-nums">
                    ₹{lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18%):</span>
                  <span className="font-mono text-slate-900 font-bold tabular-nums">
                    ₹{gstLine.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total (Incl. GST):</span>
                  <span className="text-amber-600 font-mono tabular-nums text-base font-black">
                    ₹{totalWithGst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
                    isInCart
                      ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Updated in RFQ Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to Quote Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantQuote}
                  className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  <span>Generate Formal Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Direct Warehouse Dispatch from Bangalore</span>
                <button
                  onClick={() => setRfqOpen(true)}
                  className="text-amber-600 font-bold hover:underline"
                >
                  Need Custom Project Cutting?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Data Sheet Spec Matrix */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Technical Datasheet &amp; Electrical Standards</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Conductor Design</span>
              <span className="text-slate-900 font-bold text-sm">
                {product.conductor || "Fine-wire bare copper, Class 5 to IEC 60228"}
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Nominal Voltage U0/U</span>
              <span className="text-slate-900 font-bold text-sm">
                {product.voltage || "300 / 500 V"}
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Operating Temperature</span>
              <span className="text-slate-900 font-bold text-sm">
                {product.tempRange || "-40°C to +80°C (Fixed)"}
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Minimum Bending Radius</span>
              <span className="text-slate-900 font-bold text-sm">
                Occasional flexing: 10 x OD / Fixed: 4 x OD
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Flame Retardancy</span>
              <span className="text-slate-900 font-bold text-sm">
                IEC 60332-1-2 / VDE 0482-332-1-2
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-1">
              <span className="text-slate-400 font-mono block">Chemical &amp; Oil Resistance</span>
              <span className="text-slate-900 font-bold text-sm">
                DIN EN 50290-2-22 (TM54)
              </span>
            </div>
          </div>
        </div>

        {/* RFQ Modal */}
        <RFQModal
          productName={`${product.name} (${product.partNo})`}
          isOpen={rfqOpen}
          onClose={() => setRfqOpen(false)}
        />

        {/* Fullscreen Image Zoom Modal (+/-) */}
        <ImageZoomModal
          isOpen={isZoomModalOpen}
          onClose={() => setIsZoomModalOpen(false)}
          imageSrc={selectedImg}
          altText={product.name}
          title={product.name}
          brand={product.brand}
          partNo={product.partNo}
        />
      </div>
    </div>
  );
};
