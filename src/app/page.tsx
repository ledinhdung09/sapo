"use client";
import { AuthProvider } from "@/app/(auth)/login/AuthContext";
import LoginPage from "@/app/(auth)/login/page";
import ProtectedRoute from "@/app/(auth)/login/ProtectedRoute";
import ProgressBar from "@/components/ProgressBar";
import Sidebar from "@/components/sidebar";
import { Layout } from "antd";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại từ Next.js

  const isLoginPage: boolean = pathname === "/login"; // Kiểm tra nếu là trang đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Khởi tạo trạng thái

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken); // Chuyển đổi authToken thành boolean
  }, []);

  // Hiển thị trạng thái loading khi chưa xác định được isAuthenticated
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isLoginPage ? (
            // Chỉ hiển thị Login mà không bọc Layout
            <LoginPage />
          ) : (
            <Layout style={{ flex: 1, overflow: "hidden" }}>
              <ProgressBar />
              <Sidebar />
            </Layout>
          )}
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
