"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Typography } from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { deleteProductsAPI, getProductsAPI } from "@/api/handleApi";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  date: string;
  quantity: number;
  total: string;
  category_name: string;
}

const columns: TableColumnsType<DataType> = [
  Table.SELECTION_COLUMN,
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a: any, b: any) => b.id - a.id, // Sắp xếp giảm dần dựa trên ID
    defaultSortOrder: "ascend", // Mặc định giảm dần
    width: 20,
    showSorterTooltip: false, // Không hiển thị tooltip
  },
  { title: "Sản phẩm", dataIndex: "name", key: "name", width: 200 },
  {
    title: "Có thể bán",
    dataIndex: "quantity",
    key: "quantity",
    width: 110,
  },
  {
    title: "Loại",
    dataIndex: "category_name",
    key: "category_name",
    width: 150,
  },
  {
    title: "Nhãn hiệu",
    dataIndex: "category_name",
    key: "category_name",
    width: 200,
  },
  {
    title: "Ngày khởi tạo",
    dataIndex: "date",
    key: "date",
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

export default function Products() {
  const token: any = localStorage.getItem("authToken");
  const [data, setData] = useState<DataType[]>([]);
  const router = useRouter();
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // Danh sách các hàng được chọn

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      const res = await getProductsAPI(token);
      console.log(res);
      const formatData = res.products.map((item: any, index: number) => ({
        key: index, // Dùng index làm key duy nhất
        id: item.id || "", // Đảm bảo trường có giá trị, nếu không có trả về chuỗi rỗng
        name: item.product_name || "N/A", // Thay đổi nếu tên khách hàng không tồn tại
        date: formatDate(item.order_date) || "N/A",
        quantity: item.pricing.quantity || 0,
        total: formatCurrency(item.total) || "0",
        category_name: item.category_name || "Trống",
        status_processing: item.processing_status || "Not Started",
      }));
      setData(formatData);
      setPagination((prev) => ({
        ...prev,
        current: 1, // Trang hiện tại từ API
        total: res.products.length, // Tổng số đơn hàng từ API
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, [token]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleAddCreateProduct = () => {
    router.push("/admin/products/create");
  };

  const handleRowClick = (record: DataType) => {
    const id: string = record.id;
    router.push(`/admin/products/${id}`);
  };

  const handleDeleteSelected = async () => {
    // Lấy danh sách các sản phẩm được chọn
    const selectedItems = selectedRowKeys.map((key) =>
      data.find((item) => item.key === key)
    );

    // Lấy danh sách id và key
    const selectedIdsAndKeys = selectedItems.map((item) => ({
      id: item?.id,
      key: item?.key,
    }));

    console.log(
      "Danh sách id và key các sản phẩm được chọn:",
      selectedIdsAndKeys
    );
    // Xóa từng sản phẩm (giả sử API chỉ hỗ trợ xóa từng cái)
    for (const item of selectedIdsAndKeys) {
      const res = await deleteProductsAPI(token, item.id);
      console.log(`Đã xóa sản phẩm với ID: ${item.id}`, res);
    }

    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm và reset selectedRowKeys
    setSelectedRowKeys([]); // Reset trạng thái checkbox
    fetchData(token); // Lấy lại dữ liệu mới
  };

  const rowSelection = {
    selectedRowKeys, // Danh sách các hàng được chọn
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys); // Cập nhật danh sách các hàng được chọn
    },
  };

  return (
    <>
      <div className="flex justify-between items-center">
        {selectedRowKeys.length > 0 ? (
          <div className="flex justify-between items-center w-full">
            <Typography.Text>
              Đã chọn {selectedRowKeys.length} sản phẩm
            </Typography.Text>
            <Button type="primary" danger onClick={handleDeleteSelected}>
              Xóa sản phẩm
            </Button>
          </div>
        ) : (
          <>
            <Typography.Title level={3}>Danh sách sản phẩm</Typography.Title>
            <div>
              <Button
                className="me-3"
                icon={<UploadOutlined />}
                iconPosition={"start"}
              >
                Xuất file
              </Button>
              <Button
                className="me-3"
                icon={<DownloadOutlined />}
                iconPosition={"start"}
              >
                Nhập file
              </Button>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                iconPosition={"start"}
                onClick={handleAddCreateProduct}
              >
                Thêm sản phẩm
              </Button>
            </div>
          </>
        )}
      </div>
      <Table<DataType>
        columns={columns}
        rowSelection={rowSelection} // Gắn rowSelection vào bảng
        loading={loading}
        pagination={{
          ...pagination,

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
