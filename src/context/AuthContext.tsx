import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserProfile, QuotationDocument } from "../types";
import { useToast } from "./ToastContext";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "signup";
  isAccountModalOpen: boolean;
  openAuthModal: (tab?: "signin" | "signup") => void;
  closeAuthModal: () => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  login: (identifier: string, password?: string) => boolean;
  signup: (profile: UserProfile) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  savedQuotes: QuotationDocument[];
  saveQuote: (quote: QuotationDocument) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "siddhi_client_profile_v3";
const REGISTERED_USERS_KEY = "siddhi_registered_users_v3";
const QUOTES_STORAGE_KEY = "siddhi_saved_rfqs_v2";

const DEFAULT_USERS: UserProfile[] = [
  {
    name: "Rajesh Kumar",
    email: "procurement@apex-automation.in",
    company: "Apex Automation & Switchgear Pvt Ltd",
    phone: "9845012345",
    gstin: "29AABCU9603R1ZM",
    address: "Plot 42, Peenya Industrial Area, 2nd Stage",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560058",
    password: "password123",
  },
  {
    name: "Suresh Sharma",
    email: "purchase@lapp-partner.in",
    company: "LAPP Cable Partner OEM",
    phone: "9900000000",
    gstin: "29AABCS1234F1Z8",
    address: "Bommasandra Industrial Area",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560099",
    password: "password123",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => {
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [savedQuotes, setSavedQuotes] = useState<QuotationDocument[]>(() => {
    try {
      const stored = localStorage.getItem(QUOTES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      if (registeredUsers.length > 0) {
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
      }
    } catch (e) {
      console.error(e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(savedQuotes));
    } catch (e) {
      console.error(e);
    }
  }, [savedQuotes]);

  const openAuthModal = (tab: "signin" | "signup" = "signin") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => setIsAccountModalOpen(false);

  const login = (identifier: string, password?: string): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const digitsOnly = identifier.replace(/\D/g, "");

    // Search existing registered users by email OR phone
    const existingUser = registeredUsers.find((u) => {
      const uEmail = u.email.trim().toLowerCase();
      const uPhoneDigits = (u.phone || "").replace(/\D/g, "");
      return uEmail === cleanId || (digitsOnly.length >= 7 && uPhoneDigits.endsWith(digitsOnly));
    });

    if (existingUser) {
      if (password && existingUser.password && existingUser.password !== password) {
        showToast("Incorrect password. Please try again.", "error");
        return false;
      }
      setUser(existingUser);
      setIsAuthModalOpen(false);
      showToast(`Welcome back, ${existingUser.company || existingUser.name}!`, "success");
      return true;
    }

    // If user not registered yet but logging in with credentials, create fallback profile
    const isEmail = cleanId.includes("@");
    const newProfile: UserProfile = {
      name: isEmail ? cleanId.split("@")[0].toUpperCase() : "Corporate Client",
      email: isEmail ? cleanId : `${digitsOnly || "client"}@siddhi-eshop.in`,
      company: "Registered B2B Partner",
      phone: digitsOnly ? `+91 ${digitsOnly}` : "+91 99000 00000",
      gstin: "29AABCU9603R1ZM",
      address: "Industrial Complex",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560058",
      password: password || "password123",
    };

    setRegisteredUsers((prev) => [...prev, newProfile]);
    setUser(newProfile);
    setIsAuthModalOpen(false);
    showToast(`Signed in successfully as ${newProfile.name}`, "success");
    return true;
  };

  const signup = (profile: UserProfile): boolean => {
    // Add to registered users list
    setRegisteredUsers((prev) => {
      const filtered = prev.filter(
        (u) => u.email.toLowerCase() !== profile.email.toLowerCase() && u.phone !== profile.phone
      );
      return [...filtered, profile];
    });

    setUser(profile);
    setIsAuthModalOpen(false);
    showToast("Corporate account created & signed in successfully!", "success");
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAccountModalOpen(false);
    showToast("Signed out of corporate portal", "info");
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...profile };
      // Also sync back to registeredUsers
      setRegisteredUsers((rUsers) =>
        rUsers.map((u) => (u.email === prev.email ? updated : u))
      );
      return updated;
    });
    showToast("Profile details updated successfully", "success");
  };

  const saveQuote = (quote: QuotationDocument) => {
    setSavedQuotes((prev) => [quote, ...prev.filter((q) => q.id !== quote.id)]);
    showToast(`Quotation ${quote.quoteNo} archived in your portal`, "success");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalTab,
        isAccountModalOpen,
        openAuthModal,
        closeAuthModal,
        openAccountModal,
        closeAccountModal,
        login,
        signup,
        logout,
        updateProfile,
        savedQuotes,
        saveQuote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

