import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Role = "superadmin" | "admin" | "student";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string; 
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Mock authentication API
    const mockUsers: User[] = [
      { id: 1, name: "Alice Admin", email: "admin@uni.com", role: "admin", avatar: "https://i.pravatar.cc/150?img=1"  },
      { id: 2, name: "Bob SuperAdmin", email: "super@uni.com", role: "superadmin", avatar: "https://i.pravatar.cc/150?img=2"  },
      { id: 3, name: "Charlie Student", email: "student@uni.com", role: "student" },
    ];

    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
