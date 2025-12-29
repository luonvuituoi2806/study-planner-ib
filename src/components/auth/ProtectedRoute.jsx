import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../common/Loading";

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return <Loading fullScreen />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
}

/**
 * Guest Route Component
 * Redirects authenticated users away from login/register pages
 */
export function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
