"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string | null;
  institution: string | null;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("researchpilot_token");
    const savedUser = localStorage.getItem("researchpilot_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("researchpilot_token");
        localStorage.removeItem("researchpilot_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (jwtToken: string, userData: User) => {
    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem("researchpilot_token", jwtToken);
    localStorage.setItem("researchpilot_user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("researchpilot_token");
    localStorage.removeItem("researchpilot_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
