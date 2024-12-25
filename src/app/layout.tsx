"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LoginPage from "@/app/(auth)/login/page";
import { Layout } from "antd";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation"; // Import hook để lấy pathname
import { AuthProvider } from "@/app/(auth)/login/AuthContext";
import ProgressBar from "@/components/ProgressBar";
import ProtectedRoute from "@/app/(auth)/login/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại từ Next.js

  const isLoginPage: boolean = pathname === "/login"; // Kiểm tra nếu là trang đăng nhập
  const isAuthenticated = localStorage.getItem("authToken") ? true : false;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
