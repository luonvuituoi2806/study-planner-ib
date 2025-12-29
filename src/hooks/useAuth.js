import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Custom hook for accessing authentication context
 * Provides user state and auth methods throughout the app
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default useAuth;
