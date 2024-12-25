"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress"; // Import thư viện NProgress
import "nprogress/nprogress.css"; // Import CSS mặc định của NProgress

const ProgressBar: React.FC = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    // Hiển thị thanh tiến trình khi đường dẫn thay đổi
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done(); // Kết thúc sau một khoảng thời gian ngắn
    }, 300);

    return () => {
      clearTimeout(timer); // Dọn dẹp timeout để tránh lỗi
      NProgress.done();
    };
  }, [pathname]); // Chạy lại hiệu ứng mỗi khi đường dẫn thay đổi

  return null; // Không cần render gì
};

export default ProgressBar;
