import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Search,
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  Upload,
  Paperclip,
  Award,
  Truck,
  Users,
  X,
} from "lucide-react";
import { PRODUCTS_DATA, CATEGORIES, BRANDS } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";
import { QuickViewModal } from "../components/ui/QuickViewModal";
import { RFQModal } from "../components/ui/RFQModal";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import type { Product, QuotationDocument, QuotationItem } from "../types";

export const Home: React.FC = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const { user, saveQuote } = useAuth();
  const { showToast } = useToast();

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Catalog Filtering State
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [showCatalog, setShowCatalog] = useState(false);

  // Modals
  const [brandModal, setBrandModal] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProductName, setRfqProductName] = useState<string | null>(null);

  // RFQ Form Section State
  const [rfqCompany, setRfqCompany] = useState(user?.company || "");
  const [rfqName, setRfqName] = useState(user?.name || "");
  const [rfqEmail, setRfqEmail] = useState(user?.email || "");
  const [rfqPhone, setRfqPhone] = useState(user?.phone || "");
  const [rfqGstin, setRfqGstin] = useState(user?.gstin || "");
  const [rfqCategory, setRfqCategory] = useState("lapp");
  const [rfqQuantity, setRfqQuantity] = useState("500");
  const [rfqCity, setRfqCity] = useState(user?.city || "Bangalore");
  const [rfqNotes, setRfqNotes] = useState("");
  const [rfqFiles, setRfqFiles] = useState<{ name: string; size: number }[]>([]);
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccessRef, setRfqSuccessRef] = useState<string | null>(null);

  // Sync user state to RFQ form if user logs in
  useEffect(() => {
    if (user) {
      if (!rfqCompany) setRfqCompany(user.company || "");
      if (!rfqName) setRfqName(user.name);
      if (!rfqEmail) setRfqEmail(user.email);
      if (!rfqPhone) setRfqPhone(user.phone || "");
      if (!rfqGstin) setRfqGstin(user.gstin || "");
    }
  }, [user]);

  // Handle URL hashes for smooth scrolling & catalog visibility
  useEffect(() => {
    if (location.hash === "#catalog" || location.search.includes("search")) {
      setShowCatalog(true);
    }
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      setSearchQuery(search);
      setShowCatalog(true);
    }
  }, [location]);

  // Auto-advance Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      brand: "LAPP KABEL STUTTGART",
      origin: "Germany",
      logo: "/images/logo-lapp.png",
      tagline: "World's First Flexible Control Cable",
      headline: "ÖLFLEX® CLASSIC 110 Ready Stock",
      description:
        "High flexibility, flame retardant to IEC 60332-1, and certified oil resistance. Available in over 100 core and cross-section combinations directly from Bangalore warehouse.",
      img: "/images/promo-lapp.jpg",
      badge: "VDE REG. NO. 7030",
      ctaText: "Open ÖLFLEX® Center",
      ctaLink: "/olflex-cables",
      productSampleId: "lapp-01",
      bgClass: "bg-gradient-to-r from-zinc-950 via-slate-900 to-amber-950/80 border-amber-500/30",
      pillClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      btnClass: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/30",
      cardBorder: "border-amber-500/30",
    },
    {
      brand: "EATON - MOELLER",
      origin: "Germany / USA",
      logo: "/images/logo-eaton.png",
      tagline: "Intelligent Motor Protection & Switchgear",
      headline: "PKZM0 Breakers & DILM Contactors",
      description:
        "Switching capacity up to 150 kA, differential phase-failure sensitivity, and electronic wide-range coil technology for modern automated industrial panels.",
      img: "/images/promo-eaton.jpg",
      badge: "DIRECT FACTORY RATES",
      ctaText: "Explore Eaton Switchgear",
      ctaLink: "/about-eaton",
      productSampleId: "eaton-01",
      bgClass: "bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/90 border-blue-500/30",
      pillClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      btnClass: "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-blue-500/30",
      cardBorder: "border-blue-500/30",
    },
    {
      brand: "MENNEKES GERMANY",
      origin: "Germany",
      logo: "/images/logo-mennekes.png",
      tagline: "Industrial CEE Pin & Sleeve Standards",
      headline: "Watertight IP44 & IP67 Plugs & Sockets",
      description:
        "Engineered with nickel-plated brass contacts and impact-resistant Polyamide 6 housings. Bulk factory OEM box pricing for major machine builders and site installations.",
      img: "/images/promo-mennekes.jpg",
      badge: "OEM BOX RATES",
      ctaText: "Explore Mennekes",
      ctaLink: "/about-mennekes",
      productSampleId: "menn-01",
      bgClass: "bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/90 border-rose-500/30",
      pillClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
      btnClass: "bg-gradient-to-r from-rose-600 to-red-500 hover:from-rose-700 hover:to-red-600 text-white shadow-rose-500/30",
      cardBorder: "border-rose-500/30",
    },
    {
      brand: "PARTEX SWEDEN",
      origin: "Sweden",
      logo: "/images/logo-partex.png",
      tagline: "Swedish Precision Wire Identification",
      headline: "PA Chevron Markers & ProMark T-1000",
      description:
        "Interlocking chevron cut guarantees alignment. Self-extinguishing UL94-V0 PVC and high-speed portable thermal printers for control panel builders and switchboard makers.",
      img: "/images/promo-partex.jpg",
      badge: "FREE SAMPLE KIT ON RFQ",
      ctaText: "Explore Partex Marking",
      ctaLink: "/about-partex",
      productSampleId: "partex-01",
      bgClass: "bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/90 border-emerald-500/30",
      pillClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      btnClass: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white shadow-emerald-500/30",
      cardBorder: "border-emerald-500/30",
    },
  ];

  // Filter Catalog
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DATA];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "all") {
      result = result.filter((p) => p.brand.toLowerCase().includes(selectedBrand.toLowerCase()));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNo.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleRfqFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arr = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: f.size,
      }));
      setRfqFiles((prev) => [...prev, ...arr]);
      showToast(`Attached ${arr.length} file(s) to RFQ`, "info");
    }
  };

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitting(true);

    const refNo = `SE-BOM-${Date.now().toString().slice(-6)}`;
    setRfqSuccessRef(refNo);

    const qty = parseFloat(rfqQuantity) || 100;
    const estRate = 85.0;
    const sub = qty * estRate;
    const gst = sub * 0.18;

    const mockItem: QuotationItem = {
      id: `bom-${Date.now()}`,
      partNo: "BOM-SCHEDULE",
      name: `Project BOM Schedule (${rfqCategory.toUpperCase()})`,
      brand: rfqCategory.toUpperCase(),
      hsnCode: "85444990",
      unit: "lot",
      qty: 1,
      unitPrice: sub,
      totalBeforeTax: sub,
      gstRate: 18,
      gstAmount: gst,
      totalWithTax: sub + gst,
    };

    const doc: QuotationDocument = {
      id: refNo,
      quoteNo: refNo,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      validUntil: new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      customerName: rfqName,
      companyName: rfqCompany,
      gstin: rfqGstin,
      email: rfqEmail,
      phone: rfqPhone,
      address: "Project Site Delivery",
      city: rfqCity,
      state: "Karnataka",
      pincode: "560001",
      items: [mockItem],
      subtotal: sub,
      cgst: gst / 2,
      sgst: gst / 2,
      igst: 0,
      isInterstate: false,
      freight: 0,
      grandTotal: sub + gst,
      deliveryTerms: "Ex-Bangalore Central Warehouse",
      paymentTerms: "Standard Corporate Credit Terms",
      status: "Generated",
      notes: rfqNotes,
    };

    saveQuote(doc);

    setTimeout(() => {
      setRfqSubmitting(false);
      showToast("Quotation request registered! Reference generated.", "success");
    }, 600);
  };

  const brandCardStyles: Record<string, { bg: string; border: string; strip: string; badge: string; text: string }> = {
    lapp: {
      bg: "bg-gradient-to-br from-amber-500/15 via-amber-50 to-orange-100/70",
      border: "border-amber-300 hover:border-amber-500 shadow-amber-500/10",
      strip: "border-t-4 border-t-amber-500",
      badge: "bg-amber-200 text-amber-950 font-bold",
      text: "text-amber-800 hover:text-amber-950",
    },
    eaton: {
      bg: "bg-gradient-to-br from-blue-500/15 via-sky-50 to-blue-100/70",
      border: "border-blue-300 hover:border-blue-500 shadow-blue-500/10",
      strip: "border-t-4 border-t-blue-500",
      badge: "bg-blue-200 text-blue-950 font-bold",
      text: "text-blue-800 hover:text-blue-950",
    },
    mennekes: {
      bg: "bg-gradient-to-br from-rose-500/15 via-rose-50 to-red-100/70",
      border: "border-rose-300 hover:border-rose-500 shadow-rose-500/10",
      strip: "border-t-4 border-t-rose-500",
      badge: "bg-rose-200 text-rose-950 font-bold",
      text: "text-rose-800 hover:text-rose-950",
    },
    partex: {
      bg: "bg-gradient-to-br from-emerald-500/15 via-emerald-50 to-teal-100/70",
      border: "border-emerald-300 hover:border-emerald-500 shadow-emerald-500/10",
      strip: "border-t-4 border-t-emerald-500",
      badge: "bg-emerald-200 text-emerald-950 font-bold",
      text: "text-emerald-800 hover:text-emerald-950",
    },
  };

  return (
    <main className="flex flex-col gap-0">
      {/* Spacer wrapper for sections after the hero */}
      {/* ======================================================== */}
      {/* HERO BANNER CAROUSEL SLIDER                               */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* HERO BANNER CAROUSEL SLIDER                               */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* HERO BANNER CAROUSEL SLIDER                               */}
      {/* ======================================================== */}
      <section className="w-full text-slate-900">
        <div className="w-full relative">
          <div className="relative w-full overflow-hidden shadow-2xl">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlide;
              if (!isActive) return null;

              return (
                <div
                  key={slide.brand}
                  className={`w-full ${slide.bgClass} px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20 text-white relative overflow-hidden transition-all duration-500 min-h-[480px] flex items-center`}
                >
                  {/* Subtle background glow */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10">
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                      {/* Top Row: Brand Logo, Origin & Badge */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs h-10 flex items-center justify-center max-w-[120px]">
                          <img
                            src={slide.logo}
                            alt={slide.brand}
                            className="max-h-6 w-auto object-contain"
                          />
                        </div>
                        <span className={`text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${slide.pillClass}`}>
                          {slide.origin} · {slide.badge}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-amber-400 font-bold">
                          {slide.tagline}
                        </div>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                          {slide.headline}
                        </h1>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                        {slide.description}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                          to={slide.ctaLink}
                          className={`px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg ${slide.btnClass}`}
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => {
                            const brandId = slide.brand.toLowerCase().includes("lapp")
                              ? "lapp"
                              : slide.brand.toLowerCase().includes("eaton")
                              ? "eaton"
                              : slide.brand.toLowerCase().includes("mennekes")
                              ? "mennekes"
                              : "partex";
                            setSelectedBrand(brandId);
                            setSelectedCategory("all");
                            setShowCatalog(true);
                            setTimeout(() => {
                              const catEl = document.getElementById("catalog");
                              if (catEl) catEl.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors backdrop-blur-xs flex items-center gap-2 cursor-pointer"
                        >
                          <span>Explore {slide.brand.split(" ")[0]} Catalog</span>
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Hero Image Preview */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div className="relative w-full flex items-center justify-center group">
                        <img
                          src={slide.img}
                          alt={slide.headline}
                          className="max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-amber-300 font-bold flex justify-between items-center">
                          <span>{slide.brand}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Carousel Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white border border-white/20 flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide
                      ? "w-7 bg-amber-400 shadow-sm"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 1. AUTHORIZED BRAND PORTFOLIOS: 4 BRAND CARDS & INLINE CATALOG */}
      {/* ======================================================== */}
      <section id="brand-portfolios" className="w-full bg-white border-t border-b border-slate-200 scroll-mt-24 py-12 lg:py-16 text-slate-900">
        <div className="w-full px-4 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                Direct OEM Channels
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Authorized Brand Portfolios
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/olflex-cables"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20"
              >
                <span>ÖLFLEX® Configurator (100+ Specs)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/quotation"
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" />
                <span>Commercial Quote Sheet</span>
              </Link>
            </div>
          </div>

          {/* 4 Brand Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 w-full">
            {BRANDS.map((b: any) => {
              const style = brandCardStyles[b.id] || {
                bg: "bg-white",
                border: "border-slate-200 hover:border-slate-400",
                strip: "border-t-4 border-t-slate-500",
                badge: "bg-slate-100 text-slate-700",
                text: "text-amber-600",
              };
              const isOpen = brandModal === b.id;

              return (
                <div
                  key={b.id}
                  onClick={() => {
                    setSelectedBrand(b.id);
                    setSelectedCategory("all");
                    setShowCatalog(true);
                    setTimeout(() => {
                      const el = document.getElementById("catalog");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 150);
                  }}
                  className={`rounded-2xl ${style.bg} ${style.border} ${style.strip} p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group hover:-translate-y-2 min-h-[260px] lg:min-h-[290px] w-full ${
                    selectedBrand === b.id && showCatalog ? "ring-2 ring-amber-500 shadow-xl scale-[1.02] bg-white" : ""
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Logo & Origin Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs h-14 flex items-center justify-center max-w-[140px] shrink-0">
                        <img
                          src={b.logo}
                          alt={b.name}
                          className="max-h-8 w-auto object-contain"
                        />
                      </div>
                      <span className={`text-[11px] font-mono uppercase px-2.5 py-1 rounded-md font-bold ${style.badge}`}>
                        {b.origin}
                      </span>
                    </div>

                    {/* Brand Title & Description */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-amber-600 transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium line-clamp-3">
                        {b.description}
                      </p>
                    </div>
                  </div>

                  {/* Explore Catalog CTA */}
                  <div className={`pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs sm:text-sm font-bold ${style.text}`}>
                    <span>Explore {b.name.split(" ")[0]} Catalog</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inline Product Catalog Display - Appears directly inside this same section below cards */}
          {showCatalog && (
            <div id="catalog" className="w-full pt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-slate-200">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowCatalog(false);
                        setSelectedBrand("all");
                        setSelectedCategory("all");
                        setSearchQuery("");
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-amber-100 border border-slate-300 hover:border-amber-400 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>← Close Catalog</span>
                    </button>
                    {selectedBrand !== "all" && (
                      <span className="text-xs font-mono uppercase px-2.5 py-1 rounded-lg bg-amber-500 text-white font-bold">
                        {BRANDS.find((b) => b.id === selectedBrand)?.name || selectedBrand.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {selectedBrand !== "all"
                      ? `${BRANDS.find((b) => b.id === selectedBrand)?.name || selectedBrand.toUpperCase()} Product Catalog`
                      : "Industrial Electrical & Automation Catalog"}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/olflex-cables"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                  >
                    <span>ÖLFLEX® Configurator (100+ Specs)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/quotation"
                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-amber-500" />
                    <span>Commercial Quote Sheet</span>
                  </Link>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="space-y-4">
                {/* Search, Brand dropdown, Sorter */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                  <div className="relative sm:col-span-2">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Filter by part number, core size, voltage, or brand..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xs font-medium"
                    />
                  </div>

                  <div>
                    <select
                      value={selectedBrand}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "all") {
                          setShowCatalog(false);
                          setSelectedBrand("all");
                          setSelectedCategory("all");
                        } else {
                          setSelectedBrand(val);
                          setSelectedCategory("all");
                        }
                      }}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs font-semibold"
                    >
                      <option value="lapp">LAPP KABEL</option>
                      <option value="eaton">EATON - MOELLER</option>
                      <option value="partex">PARTEX SWEDEN</option>
                      <option value="mennekes">MENNEKES</option>
                      <option value="havells">HAVELLS</option>
                      <option value="hager">HAGER</option>
                      <option value="neptune">NEPTUNE</option>
                      <option value="jef">JEF ECO SAFE</option>
                      <option value="all">← Close Catalog</option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 shadow-xs font-semibold"
                    >
                      <option value="featured">Sort: Featured OEM</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Product Name (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Cards Grid with custom brand borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onDirectQuote={(p) => {
                      setRfqProductName(`${p.name} (${p.partNo})`);
                      setRfqModalOpen(true);
                    }}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16 border border-slate-200 rounded-2xl bg-white text-slate-500 text-xs space-y-2">
                  <p>No products matched your active filters.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedBrand("all");
                      setSearchQuery("");
                    }}
                    className="text-amber-600 underline font-bold"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>



      {/* ======================================================== */}
      {/* 5. RFQ & BULK QUOTATION FORM: CLEAN WHITE PANEL          */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 5. RFQ & BULK QUOTATION FORM: CLEAN WHITE PANEL          */}
      {/* ======================================================== */}
      <section id="rfq" className="w-full bg-white border-t border-b border-slate-200 scroll-mt-24 py-12 lg:py-16 text-slate-900 relative overflow-hidden">
        <div className="w-full px-4 lg:px-8 relative z-10">
          {/* Subtle amber background glow */}
          <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-8 space-y-2 relative z-10">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-700 flex items-center gap-2 font-bold">
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              <span>B2B Commercial Procurement Desk</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Request a Bulk Project Quotation (RFQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Submit your project schedule, cable sizing requirements, or upload an Excel Bill of Materials (BOM). Our engineering sales desk generates official GST quotations with delivery timeline commitments.
            </p>
          </div>

          {rfqSuccessRef ? (
            <div className="border border-emerald-200 bg-emerald-50 rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Quotation Request Dispatched!
              </h3>
              <div className="font-mono text-emerald-800 bg-white px-4 py-2 rounded-xl border border-emerald-300 inline-block text-sm font-bold shadow-xs">
                Quotation Reference: <strong>{rfqSuccessRef}</strong>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto font-medium">
                Your quotation has been compiled and saved to your Corporate Portal. An official commercial copy has been submitted for dispatch review.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/quotation"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  View Quotation Document &amp; Print PDF
                </Link>
                <button
                  onClick={() => setRfqSuccessRef(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                >
                  Submit Another RFQ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Automation Pvt Ltd"
                    value={rfqCompany}
                    onChange={(e) => setRfqCompany(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Contact Officer *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Purchasing / Project Engineer"
                    value={rfqName}
                    onChange={(e) => setRfqName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={rfqEmail}
                    onChange={(e) => setRfqEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99000 48877"
                    value={rfqPhone}
                    onChange={(e) => setRfqPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Buyer GSTIN (For ITC 18%)
                  </label>
                  <input
                    type="text"
                    placeholder="29AABCU9603R1ZM"
                    value={rfqGstin}
                    onChange={(e) => setRfqGstin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Delivery Site City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Bangalore, Chennai, Pune..."
                    value={rfqCity}
                    onChange={(e) => setRfqCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Primary Product Line
                  </label>
                  <select
                    value={rfqCategory}
                    onChange={(e) => setRfqCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="lapp">LAPP Kabel Flexible Cables &amp; Wires</option>
                    <option value="eaton">EATON Moeller Switchgear &amp; Starters</option>
                    <option value="mennekes">MENNEKES CEE Industrial Plugs</option>
                    <option value="partex">PARTEX Sweden Marking Systems</option>
                    <option value="mixed">Complete Project BOM / Mixed Schedule</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-800 font-bold mb-1">
                    Estimated Meters / Quantity
                  </label>
                  <input
                    type="text"
                    value={rfqQuantity}
                    onChange={(e) => setRfqQuantity(e.target.value)}
                    placeholder="e.g. 500m of 4G2.5, 20x 32A 5P plugs"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Bill of Materials (BOM) Details &amp; Specifications
                </label>
                <textarea
                  rows={3}
                  value={rfqNotes}
                  onChange={(e) => setRfqNotes(e.target.value)}
                  placeholder="Mention exact part numbers, cable sizes (e.g. 3G1.5, 4G4.0, 7G1.0), required drum cutting lengths, and site delivery dates..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white leading-relaxed font-medium"
                />
              </div>

              {/* Upload Dropzone */}
              <div>
                <label className="block text-slate-800 font-bold mb-1 flex items-center justify-between">
                  <span>Attach Excel BOM / Drawing / RFQ Schedule (Optional)</span>
                  <span className="text-[11px] text-slate-500 font-normal">Max 25MB each</span>
                </label>
                <label className="border border-dashed border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/50 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                  <Upload className="w-5 h-5 text-amber-600 mb-1" />
                  <span className="text-slate-900 font-bold">Drop BOM spreadsheet or click to browse</span>
                  <span className="text-[11px] text-slate-500 font-medium">Excel (.xlsx, .csv), PDF, CAD, ZIP</span>
                  <input
                    type="file"
                    multiple
                    onChange={handleRfqFileChange}
                    className="hidden"
                  />
                </label>
                {rfqFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rfqFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-medium"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-amber-600" />
                        <span className="truncate max-w-[180px]">{f.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={rfqSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-50"
                >
                  {rfqSubmitting ? "Submitting Request..." : "Submit Request for Quotation"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. TRUST METRICS: VIBRANT COLORED STAT CARDS             */}
      {/* ======================================================== */}
      <section className="w-full px-4 lg:px-8">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Amber / Ready stock */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-100/80 to-orange-100/90 border border-amber-300 border-t-4 border-t-amber-500 p-5 sm:p-6 space-y-2 shadow-md hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold mb-2">
              <Zap className="w-5 h-5 text-amber-700" />
            </div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-amber-950 break-words block">
              25,000m+
            </span>
            <h4 className="text-sm font-bold text-slate-900 break-words">Ready Stock Inventory</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium break-words hyphens-auto">
              Maintained in Bangalore central depot across ÖLFLEX® cables, CEE plugs, and motor breakers.
            </p>
          </div>

          {/* Card 2: Blue / OEM Genuine */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 via-blue-100/80 to-sky-100/90 border border-blue-300 border-t-4 border-t-blue-500 p-5 sm:p-6 space-y-2 shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-700 flex items-center justify-center font-bold mb-2">
              <Award className="w-5 h-5 text-blue-700" />
            </div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-blue-950 break-words block">
              100% OEM
            </span>
            <h4 className="text-sm font-bold text-slate-900 break-words">Genuine Certification</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium break-words hyphens-auto">
              Direct factory warranty with manufacturer batch test reports (VDE, UL, CSA, CE, RoHS).
            </p>
          </div>

          {/* Card 3: Emerald / Rapid Dispatch */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-100/80 to-teal-100/90 border border-emerald-300 border-t-4 border-t-emerald-500 p-5 sm:p-6 space-y-2 shadow-md hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold mb-2">
              <Truck className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-950 break-words block">
              24-48 Hrs
            </span>
            <h4 className="text-sm font-bold text-slate-900 break-words">Dispatch Lead Time</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium break-words hyphens-auto">
              Immediate same-day or next-day dispatch for Peenya, Bommasandra, Hosur, and South-India sites.
            </p>
          </div>

          {/* Card 4: Purple / Corporate Clients */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 via-purple-100/80 to-indigo-100/90 border border-purple-300 border-t-4 border-t-purple-500 p-5 sm:p-6 space-y-2 shadow-md hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-700 flex items-center justify-center font-bold mb-2">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <span className="text-2xl sm:text-3xl font-black font-mono text-purple-950 break-words block">
              1,200+
            </span>
            <h4 className="text-sm font-bold text-slate-900 break-words">Corporate Clients</h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium break-words hyphens-auto">
              Trusted by automation OEMs, panel builders, switchgear fabricators, and infrastructure leaders.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ABOUT COMPANY SECTION                                 */}
      {/* ======================================================== */}
      <section id="about" className="w-full bg-white border-t border-b border-slate-200 scroll-mt-24 py-12 lg:py-16 text-slate-900">
        <div className="w-full px-4 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
              Company Profile
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Siddhi Electricals &amp; Cables
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              Established as one of South India's premier authorized distributors for high-reliability industrial automation components, power cables, and motor control switchgear. Based in the heart of Bangalore's electrical trade corridor, we bridge European engineering excellence with instant on-the-ground availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200/80 text-xs">
            <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-50/60 to-white border border-amber-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Industrial Expertise</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Over two decades of technical experience in helping panel builders, automation engineers, and machine tool manufacturers select the exact cable and switchgear specifications for demanding applications.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 via-sky-50/60 to-white border border-blue-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Warehouse Infrastructure</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Equipped with motorized cable decoilers, drum handling cranes, and specialized cutting stations to provide exact length requirements without charging for unnecessary scrap.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-50/60 to-white border border-emerald-200 shadow-xs">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Transparent Commercials</span>
              </h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                Full 18% GST Input Tax Credit (ITC) compliance, formal commercial quotations with price firm commitments, and structured credit facilities for verified industrial corporate accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. CONTACT & WAREHOUSE DISPATCH SECTION                  */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 8. CONTACT & WAREHOUSE DISPATCH SECTION                  */}
      {/* ======================================================== */}
      <section id="contact" className="w-full bg-white border-t border-b border-slate-200 scroll-mt-24 py-12 lg:py-16 text-slate-900">
        <div className="w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Contact Details */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-700 mb-1 font-bold">
                  Bangalore Headquarters
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Direct Sales &amp; Dispatch Desk
                </h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  Connect directly with our technical engineers for cable sizing assistance, factory certificates, or immediate dispatch pickups.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-50/70 to-white border border-amber-300 shadow-xs">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-800 block font-mono text-[11px] mb-0.5 font-bold uppercase">
                      Main Showroom &amp; Trade Counter
                    </span>
                    <span className="text-slate-900 font-black text-sm">
                      Siddhi Electricals &amp; Cables
                    </span>
                    <p className="text-slate-700 mt-1 leading-relaxed font-medium">
                      No. 12/3, S.P. Road Cross, Bangalore - 560002, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/15 via-sky-50/70 to-white border border-blue-300 shadow-xs">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-blue-800 block font-mono text-[11px] mb-0.5 font-bold uppercase">
                      Direct Sales Hotline / WhatsApp
                    </span>
                    <a
                      href="tel:+919900048877"
                      className="text-slate-900 hover:text-blue-700 font-mono font-black text-sm"
                    >
                      +91 99000 48877
                    </a>
                    <span className="text-slate-600 block text-[11px] mt-0.5 font-medium">
                      Landline: +91 80 2221 4455 / 2221 4456
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-50/70 to-white border border-emerald-300 shadow-xs">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-emerald-800 block font-mono text-[11px] mb-0.5 font-bold uppercase">
                      Official Inquiries &amp; Quotation Submissions
                    </span>
                    <a
                      href="mailto:sales@siddhikabel.com"
                      className="text-slate-900 hover:text-emerald-700 font-bold text-sm"
                    >
                      sales@siddhikabel.com
                    </a>
                    <span className="text-slate-600 block text-[11px] mt-0.5 font-medium">
                      Corporate: enquiry@siddhikabel.com
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Dispatch Schedule */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white border border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 font-bold">
                  <Clock className="w-4 h-4" />
                  <span>Central Logistics Hub</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Bommasandra Central Warehouse
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
                  Equipped for bulk dispatch to Peenya Industrial Estate, Electronic City, Whitefield, Hosur, Chennai, and Hyderabad manufacturing corridors.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400">Monday - Friday:</span>
                    <span className="font-mono text-white font-bold">9:30 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400">Saturday:</span>
                    <span className="font-mono text-white font-bold">9:30 AM - 5:30 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400">Sunday:</span>
                    <span className="text-amber-400 font-bold">Emergency Dispatch On-Call</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="tel:+919900048877"
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-md shadow-orange-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Sales Desk Now</span>
                </a>
                <Link
                  to="/quotation"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
                >
                  Go to Quotation Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onRequestQuoteNow={(p) => {
          setQuickViewProduct(null);
          setRfqProductName(`${p.name} (${p.partNo})`);
          setRfqModalOpen(true);
        }}
      />

      {/* Global RFQ Modal */}
      <RFQModal
        productName={rfqProductName}
        isOpen={rfqModalOpen}
        onClose={() => {
          setRfqModalOpen(false);
          setRfqProductName(null);
        }}
      />
    </main>
  );
};
