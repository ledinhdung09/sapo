import { useAuth } from "@/app/(auth)/login/AuthContext";
import LoginPage from "@/app/(auth)/login/page";
import { ReactNode } from "react";
//import { useRouter } from "next/navigation";
type ProtectedRouteProps = {
  children: ReactNode;
  isAuthenticated: boolean;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  ////const router = useRouter();
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <LoginPage />;
};

export default ProtectedRoute;
