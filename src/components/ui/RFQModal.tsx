import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Upload,
  Paperclip,
  CheckCircle2,
  FileSpreadsheet,
  Building,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useCart } from "../../context/CartContext";
import type { QuotationDocument, QuotationItem } from "../../types";
import { validateRFQForm } from "../../utils/validation";

interface RFQModalProps {
  productName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  productName,
  isOpen,
  onClose,
}) => {
  const { user, saveQuote } = useAuth();
  const { showToast } = useToast();
  const { addCustomItem } = useCart();
  const navigate = useNavigate();

  const [company, setCompany] = useState(user?.company || "Apex Automation & Switchgear");
  const [name, setName] = useState(user?.name || "Procurement Manager");
  const [email, setEmail] = useState(user?.email || "procurement@apex-automation.in");
  const [phone, setPhone] = useState(user?.phone || "+91 98450 12345");
  const [gstin, setGstin] = useState(user?.gstin || "29AABCU9603R1ZM");
  const [city, setCity] = useState(user?.city || "Bangalore");
  const [quantity, setQuantity] = useState("250");
  const [unit, setUnit] = useState("meters");
  const [notes, setNotes] = useState(
    productName
      ? `Please provide formal commercial GST quotation for ${productName} with Bangalore warehouse dispatch timeline and factory test reports.`
      : "Please provide official GST quotation for project schedule requirements."
  );
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedQuoteNo, setGeneratedQuoteNo] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: f.size,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
      showToast(`Attached ${newFiles.length} file(s) to RFQ`, "info");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const validation = validateRFQForm({
      company,
      name,
      email,
      phone,
      city,
      quantity,
      gstin,
    });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      showToast(Object.values(validation.errors)[0] || "Please fix validation errors", "error");
      return;
    }

    setIsSubmitting(true);

    const quoteId = `SE-RFQ-${Date.now().toString().slice(-6)}`;
    setGeneratedQuoteNo(quoteId);

    const qtyNum = parseFloat(quantity) || 100;
    const estPrice = 75.0;
    const subtotal = qtyNum * estPrice;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    const mockItem: QuotationItem = {
      id: `item-${Date.now()}`,
      partNo: "RFQ-CUSTOM",
      name: productName || "Industrial Electrical Project BOM Schedule",
      brand: "LAPP / EATON / MENNEKES",
      hsnCode: "85444990",
      unit: unit,
      qty: qtyNum,
      unitPrice: estPrice,
      totalBeforeTax: subtotal,
      gstRate: 18,
      gstAmount: gst,
      totalWithTax: total,
    };

    const doc: QuotationDocument = {
      id: quoteId,
      quoteNo: quoteId,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      validUntil: new Date(Date.now() + 30 * 86400000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      customerName: name,
      companyName: company,
      gstin: gstin,
      email: email,
      phone: phone,
      address: "Industrial Complex, Phase II",
      city: city,
      state: "Karnataka",
      pincode: "560058",
      items: [mockItem],
      subtotal,
      cgst: gst / 2,
      sgst: gst / 2,
      igst: 0,
      isInterstate: false,
      freight: 0,
      grandTotal: total,
      deliveryTerms: "Ex-Stock Bangalore Central Warehouse (24-48 hrs)",
      paymentTerms: "30 Days Credit against Approved Corporate PO",
      status: "Generated",
      notes: notes,
    };

    saveQuote(doc);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast("Quotation request submitted! Official proforma created.", "success");
    }, 600);
  };

  const handleViewQuotation = () => {
    onClose();
    navigate("/quotation");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 text-slate-900">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Request Formal Quotation (RFQ)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {productName ? `Inquiry for: ${productName}` : "Submit Project Bill of Materials for B2B Pricing"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Quotation Request Received!
            </h4>
            <div className="inline-block bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl font-mono text-sm text-blue-700 font-bold">
              Reference Quote #: {generatedQuoteNo}
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              We have generated your formal commercial quotation schedule. Our Bangalore engineering sales desk has dispatched an instant copy to <span className="text-slate-900 font-bold">{email}</span>.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleViewQuotation}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all"
              >
                Open Quotation Document &amp; Print PDF
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Company / Corporate Name *
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Automation Pvt Ltd"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Purchasing / Project Engineer"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Official Business Email *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Buyer GSTIN (Optional)
                </label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="29AABCU9603R1ZM"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Delivery Site City *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bangalore, Chennai, Hyderabad..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Quantity and Requirement */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-slate-700 font-bold mb-1">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 500"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-semibold"
                >
                  <option value="meters">Meters</option>
                  <option value="pieces">Pieces / Units</option>
                  <option value="boxes">Boxes / Packs</option>
                  <option value="lots">Complete BOM Lot</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Specification Notes / Cable Sizes / Part Numbers
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention specific cable cores, cross section, coil lengths, or switchgear ratings..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 leading-relaxed font-medium"
              />
            </div>

            {/* Attachment Dropzone */}
            <div>
              <label className="block text-slate-700 font-bold mb-1 flex items-center justify-between">
                <span>Attach BOM / Schedule (Excel, PDF, Drawing)</span>
                <span className="text-[11px] text-slate-400 font-normal">Up to 25MB</span>
              </label>
              <label className="border border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                <Upload className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-slate-800 font-bold">Click to browse or drop Bill of Materials</span>
                <span className="text-[11px] text-slate-500 font-medium">Supported: .xlsx, .csv, .pdf, .dwg, .jpg</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] border border-slate-200 font-medium"
                    >
                      <Paperclip className="w-3 h-3 text-blue-600" />
                      <span className="max-w-[150px] truncate">{f.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Generating Official Quotation..." : "Submit Quotation Request & Generate Proforma"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
