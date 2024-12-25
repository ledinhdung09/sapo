"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Typography } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { getAllOrderAPI } from "@/api/handleApi";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  date: string;
  processing_employee_id: number;
  total: string;
  status_payment: string;
  status_processing: string;
  description?: string;
}

const columns: TableColumnsType<DataType> = [
  Table.EXPAND_COLUMN,
  Table.SELECTION_COLUMN,
  { title: "Mã đơn hàng", dataIndex: "id", key: "id", width: 140 },
  { title: "Ngày tạo", dataIndex: "date", key: "date", width: 150 },
  { title: "Khách hàng", dataIndex: "name", key: "name", width: 200 },
  {
    title: "Nguồn đơn",
    dataIndex: "processing_employee_id",
    key: "processing_employee_id",
    width: 110,
  },
  { title: "Thành tiền", dataIndex: "total", key: "total", width: 150 },
  {
    title: "Trạng thái thanh toán",
    dataIndex: "status_payment",
    key: "status_payment",
    width: 200,
  },
  {
    title: "Trạng thái xử lý",
    dataIndex: "status_processing",
    key: "status_processing",
    width: 200,
  },
];

const formatDate = (date: string): string => {
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) {
    return "N/A"; // Nếu không phải ngày hợp lệ, trả về "N/A"
  }
  return newDate.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const formatCurrency = (amount: number, currency: string = "VND"): string => {
  if (isNaN(amount)) {
    return "N/A"; // Trả về "N/A" nếu giá trị không hợp lệ
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export default function PageOrder() {
  const token: any = localStorage.getItem("authToken");
  const [data, setData] = useState<DataType[]>([]);
  const router = useRouter();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await getAllOrderAPI(
        token,
        page.toString(),
        pageSize.toString()
      );
      const formatData = res.data.map((item: any, index: number) => ({
        key: index, // Dùng index làm key duy nhất
        id: item.order_id || "", // Đảm bảo trường có giá trị, nếu không có trả về chuỗi rỗng
        name: item.customer_id || "N/A", // Thay đổi nếu tên khách hàng không tồn tại
        date: formatDate(item.order_date) || "N/A",
        processing_employee_id: item.processing_employee_id || 0,
        total: formatCurrency(item.total) || "0",
        status_payment: item.payment_status || "Pending",
        status_processing: item.processing_status || "Not Started",
      }));
      setData(formatData);
      setPagination((prev) => ({
        ...prev,
        current: res.pagination.current_page, // Trang hiện tại từ API
        total: res.pagination.total_orders, // Tổng số đơn hàng từ API
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current || 1, pagination.pageSize || 8);
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleAddCreateOrder = () => {
    router.push("/admin/orders/create");
  };

  const handleRowClick = (record: DataType) => {
    console.log("Row clicked:", record); // Thực hiện hành động khi click vào hàng
    const id: string = record.id;
    router.push(`/admin/orders/${id}`);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Typography.Title level={3}>Danh sách đơn hàng</Typography.Title>
        <div>
          <Button
            className="me-3"
            icon={<EditOutlined />}
            iconPosition={"start"}
          >
            Xuất file
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            iconPosition={"start"}
            onClick={handleAddCreateOrder}
          >
            Tạo đơn hàng
          </Button>
        </div>
      </div>
      <Table<DataType>
        columns={columns}
        rowSelection={{}}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.description}</p>
          ),
        }}
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: (total) => `Tổng cộng ${total} đơn hàng`,
          position: ["bottomCenter"],
        }}
        dataSource={data}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Gắn sự kiện click cho từng hàng
        })}
      />
    </>
  );
}
