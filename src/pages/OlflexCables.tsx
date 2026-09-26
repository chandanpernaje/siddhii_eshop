import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  RotateCcw,
  Download,
  Plus,
  Check,
  FileSpreadsheet,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ALL_OLFLEX_PRODUCTS, OLFLEX_110_PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { OlflexProduct } from "../types";
import { RFQModal } from "../components/ui/RFQModal";

export const OlflexCables: React.FC = () => {
  const [subgroup, setSubgroup] = useState<"all" | "110" | "110sy" | "110cy" | "100">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCore, setSelectedCore] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedCableForRfq, setSelectedCableForRfq] = useState<string | null>(null);

  const { addOlflexItem, cart } = useCart();
  const { showToast } = useToast();

  const handleQtyChange = (partNo: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [partNo]: Math.max(1, Math.floor(val) || 1),
    }));
  };

  const filteredProducts = useMemo(() => {
    let list: OlflexProduct[] = ALL_OLFLEX_PRODUCTS && ALL_OLFLEX_PRODUCTS.length > 0 ? ALL_OLFLEX_PRODUCTS : OLFLEX_110_PRODUCTS;

    if (subgroup === "110") {
      list = list.filter(
        (p) =>
          !p.name.includes("SY") &&
          !p.name.includes("CY") &&
          !p.name.includes("100")
      );
    } else if (subgroup === "110sy") {
      list = list.filter((p) => p.name.includes("SY"));
    } else if (subgroup === "110cy") {
      list = list.filter((p) => p.name.includes("CY"));
    } else if (subgroup === "100") {
      list = list.filter((p) => p.name.includes("100"));
    }

    if (selectedCore !== "all") {
      list = list.filter((p) => p.core.toString() === selectedCore);
    }

    if (selectedSize !== "all") {
      list = list.filter((p) => p.size.toString() === selectedSize);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.partNo.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          (p.desc && p.desc.toLowerCase().includes(q))
      );
    }

    return list;
  }, [subgroup, selectedCore, selectedSize, searchTerm]);

  const uniqueCores = useMemo(() => {
    const set = new Set<number>();
    ALL_OLFLEX_PRODUCTS.forEach((p) => set.add(p.core));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  const uniqueSizes = useMemo(() => {
    const set = new Set<number>();
    ALL_OLFLEX_PRODUCTS.forEach((p) => set.add(p.size));
    return Array.from(set).sort((a, b) => a - b);
  }, []);

  const handleAddToCart = (product: OlflexProduct) => {
    const qty = quantities[product.partNo] || 100;
    addOlflexItem(product, qty);
  };

  const handleOpenRfq = (product: OlflexProduct) => {
    setSelectedCableForRfq(`${product.name} (Part: ${product.partNo})`);
    setRfqModalOpen(true);
  };

  const handleExportCsv = () => {
    let csv = "Part No,Name,Cores,Size (sq mm),Outer Dia (mm),Copper Index (kg/km),Weight (kg/km),Contract Price (INR/m),GST 18%,MRP\n";
    filteredProducts.forEach((p) => {
      csv += `"${p.partNo}","${p.name}","${p.core}","${p.size}","${p.outerDia || "-"}","${p.copperIndex || "-"}","${p.weight || "-"}","${p.price}","${p.gst}","${p.mrp}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `OLFLEX_Cables_Catalog_${subgroup}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredProducts.length} cables to CSV`, "success");
  };

  const handleResetFilters = () => {
    setSubgroup("all");
    setSelectedCore("all");
    setSelectedSize("all");
    setSearchTerm("");
    showToast("Filters reset to default view", "info");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="w-full space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition-colors font-medium">
            Home
          </Link>
          <span>/</span>
          <Link to="/about-lapp" className="hover:text-amber-600 transition-colors font-medium">
            LAPP Kabel
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">ÖLFLEX® Cable Center</span>
        </div>

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 overflow-hidden shadow-lg">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 font-mono font-bold">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Official German Cable Configurator · Direct Stockist</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              ÖLFLEX® Industrial Flexible Control Cables
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Engineered by LAPP Stuttgart. High flexibility, chemical and oil resistance according to DIN EN 50290-2-22, and VDE registration. Over 100+ standard configurations available with same-day dispatch from our Bangalore central warehouse.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 pt-2 font-medium">
              <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                VDE Reg. No. 7030
              </span>
              <span>·</span>
              <span>Test Voltage: 4000 V</span>
              <span>·</span>
              <span>Temp: -40°C to +80°C</span>
              <span>·</span>
              <span>Class 5 Bare Copper</span>
            </div>
          </div>
        </div>

        {/* Subgroup Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-2xl overflow-x-auto max-w-full">
            <button
              onClick={() => setSubgroup("all")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                subgroup === "all"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ÖLFLEX® ({ALL_OLFLEX_PRODUCTS.length})
            </button>
            <button
              onClick={() => setSubgroup("110")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                subgroup === "110"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              CLASSIC 110 (Unshielded)
            </button>
            <button
              onClick={() => setSubgroup("110sy")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                subgroup === "110sy"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              CLASSIC 110 SY (Steel Braid)
            </button>
            <button
              onClick={() => setSubgroup("110cy")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                subgroup === "110cy"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              CLASSIC 110 CY (EMC Screened)
            </button>
            <button
              onClick={() => setSubgroup("100")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                subgroup === "100"
                  ? "bg-amber-500 text-white font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              CLASSIC 100 (Color Coded)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-500" />
              <span>Export CSV</span>
            </button>

            <Link
              to="/quotation"
              className="px-4 py-2 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-600" />
              <span>Quotation Cart ({cart.length})</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search part #, 3G1.5, 4x2.5..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>

          {/* Core Count Filter */}
          <div>
            <select
              value={selectedCore}
              onChange={(e) => setSelectedCore(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Core Counts</option>
              {uniqueCores.map((c) => (
                <option key={c} value={c.toString()}>
                  {c} Cores
                </option>
              ))}
            </select>
          </div>

          {/* Cross Section Size Filter */}
          <div>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-medium"
            >
              <option value="all">All Cross Sections (sq mm)</option>
              {uniqueSizes.map((s) => (
                <option key={s} value={s.toString()}>
                  {s} sq mm
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-xs text-slate-500 font-mono font-medium">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>
            <button
              onClick={handleResetFilters}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technical Cable Schedule Table (Crisp White with Slate Borders) */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[11px] tracking-wider font-bold">
                  <th className="py-3.5 px-4">Part #</th>
                  <th className="py-3.5 px-4">Cable Designation</th>
                  <th className="py-3.5 px-3 text-center">Core x Size</th>
                  <th className="py-3.5 px-3 text-right">Outer Dia</th>
                  <th className="py-3.5 px-3 text-right">Cu Index</th>
                  <th className="py-3.5 px-3 text-right">Weight</th>
                  <th className="py-3.5 px-4 text-right">Rate / Meter</th>
                  <th className="py-3.5 px-4 text-right">Meter Reel Qty</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.slice(0, 100).map((cable) => {
                  const qty = quantities[cable.partNo] || 100;
                  const isInCart = cart.some((i) => i.id === `olflex-${cable.partNo}`);

                  return (
                    <tr
                      key={cable.partNo}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-amber-700 whitespace-nowrap">
                        <Link
                          to={`/product-detail?id=${cable.partNo}`}
                          className="hover:underline"
                        >
                          {cable.partNo}
                        </Link>
                      </td>

                      <td className="py-3 px-4 text-slate-900 font-bold">
                        <div className="line-clamp-1">{cable.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono font-medium">
                          {cable.subCategory || "300/500V Flexible PVC Control"}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center font-mono whitespace-nowrap text-slate-800 font-medium">
                        {cable.core} {cable.pe} {cable.size} mm²
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600 font-medium">
                        {cable.outerDia ? `${cable.outerDia} mm` : "—"}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600 font-medium">
                        {cable.copperIndex ? `${cable.copperIndex} kg` : "—"}
                      </td>

                      <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600 font-medium">
                        {cable.weight ? `${cable.weight} kg` : "—"}
                      </td>

                      <td className="py-3 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                        <div className="font-bold text-slate-900 text-sm">
                          ₹{cable.price.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400 line-through">
                          MRP ₹{cable.mrp.toFixed(2)}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center border border-slate-300 rounded-lg bg-slate-50 p-1">
                          <input
                            type="number"
                            min="25"
                            step="25"
                            value={qty}
                            onChange={(e) => handleQtyChange(cable.partNo, parseFloat(e.target.value))}
                            className="w-16 bg-transparent text-center font-mono font-bold text-slate-900 text-xs focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-500 pr-1">m</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleAddToCart(cable)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                              isInCart
                                ? "bg-emerald-50 border border-emerald-300 text-emerald-800"
                                : "bg-amber-500 hover:bg-amber-600 text-white shadow-2xs"
                            }`}
                            title="Add to quotation schedule"
                          >
                            {isInCart ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                <span>In Quote</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </span>
                            )}
                          </button>

                          <button
                            onClick={() => handleOpenRfq(cable)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Request custom drum RFQ"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              No ÖLFLEX® cables matched your search criteria. Please adjust your filters or contact our engineering desk.
            </div>
          )}
        </div>

        {/* Modal for RFQ */}
        <RFQModal
          productName={selectedCableForRfq}
          isOpen={rfqModalOpen}
          onClose={() => setRfqModalOpen(false)}
        />
      </div>
    </div>
  );
};
