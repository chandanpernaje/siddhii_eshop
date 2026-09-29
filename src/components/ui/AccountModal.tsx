import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  FileSpreadsheet,
  LogOut,
  Save,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export const AccountModal: React.FC = () => {
  const { user, isAccountModalOpen, closeAccountModal, logout, updateProfile, savedQuotes } = useAuth();
  const { loadCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState(user?.company || "");
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [gstin, setGstin] = useState(user?.gstin || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");

  const navigate = useNavigate();

  if (!isAccountModalOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      company,
      name,
      phone,
      gstin,
      address,
      city,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={closeAccountModal}
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Corporate Client Portal
              </h3>
              <span className="text-xs text-slate-500 font-medium">{user.email}</span>
            </div>
          </div>
          <button
            onClick={closeAccountModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Company Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                Corporate Credentials &amp; GSTIN
              </span>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-slate-600 hover:text-slate-900 font-semibold underline"
                >
                  Edit Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">Contact Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-700 block mb-1 font-bold">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 block font-medium">Company Name</span>
                  <span className="text-slate-900 font-bold text-sm">
                    {user.company || "Not Specified"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Authorized Contact</span>
                  <span className="text-slate-900 font-bold text-sm">
                    {user.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Mobile / WhatsApp</span>
                  <span className="text-slate-900 font-mono font-bold">
                    {user.phone || "+91 98450 12345"}
                  </span>
                </div>
              </div>
            )}
          </div>


        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 transition-colors text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
          <button
            onClick={closeAccountModal}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
