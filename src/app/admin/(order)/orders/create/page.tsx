"use client";
import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  getAccountsAPI,
  getCustomersAPI,
  getProductsAPI,
} from "@/api/handleApi";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const { Option } = Select;

interface Account {
  id: string;
  username: string;
}

interface Customer {
  id: string;
  customer_name: string;
  phone: string;
}

interface Product {
  key: number;
  product_name: string;
  id: number;
  sku: string;
  price: number;
  quantity: number;
  image: string; // Đường dẫn ảnh
}

const CreateOrder = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const token: any = localStorage.getItem("authToken");
  const [dataAccount, setDataAccount] = useState<Account[]>([]);
  const [dataCustomer, setDataCustomer] = useState<Customer[]>([]);
  const [dataProduct, setDataProduct] = useState<Product[]>([]);

  // Dữ liệu giả cho bảng sản phẩm
  const columns: ColumnsType<Product> = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={record.image}
            alt={record.product_name}
            width={40}
            height={40}
          />
          <div>
            <div style={{ fontWeight: "bold", color: "#1890ff" }}>{text}</div>
            <div>{record.sku}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.key, value || 1)}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString()}₫</span>,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) => (
        <span>{(record.price * record.quantity).toLocaleString()}₫</span>
      ),
    },
    {
      key: "actions",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  const fetchDataAccount = async (token: string) => {
    try {
      const res = await getAccountsAPI(token);
      setDataAccount(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDataCustomer = async (token: string) => {
    try {
      const res = await getCustomersAPI(token);
      setDataCustomer(res.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchDataProduct = async (token: string) => {
    try {
      const res = await getProductsAPI(token);

      const formattedProducts: Product[] = res.products.map(
        (product: any, index: number) => ({
          key: index + 1, // Tạo key duy nhất dựa trên index
          product_name: product.product_name || "", // Đặt tên sản phẩm hoặc chuỗi rỗng nếu không tồn tại
          id: product.id, // ID sản phẩm
          sku: product.sku || "", // SKU sản phẩm
          price: product.price || 0, // Giá sản phẩm (mặc định là 0 nếu không tồn tại)
          quantity: 1, // Mặc định số lượng là 1
          image: product.image || "/default-image.jpg", // Đường dẫn ảnh (nếu không có thì dùng ảnh mặc định)
        })
      );
      setDataProduct(formattedProducts);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchDataAccount(token);
    fetchDataCustomer(token);
    fetchDataProduct(token);
  }, [token]);

  const [searchText, setSearchText] = useState<string>("");
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [data, setData] = useState<Product[]>([]);

  const handleSearch = (value: string) => {
    setSearchText(value);

    // Lọc danh sách sản phẩm dựa trên từ khóa
    const filtered = dataProduct
      .filter(
        (product) =>
          product.product_name.toLowerCase().includes(value.toLowerCase()) ||
          product.sku.toLowerCase().includes(value.toLowerCase())
      )
      .map((product) => ({
        value: product.product_name,
        label: `${product.product_name} - ${product.price}`,
      }));

    setOptions(filtered);
  };

  const showAllOptions = () => {
    const allOptions = dataProduct.map((product) => ({
      value: product.product_name,
      label: `${product.product_name} - ${product.price}`,
    }));
    setOptions(allOptions);
    console.log("first");
  };

  const handleSelect = (value: string) => {
    setSearchText("");
    // Tìm sản phẩm đã chọn
    const selectedProduct = dataProduct.find(
      (product) => product.product_name === value
    );

    if (selectedProduct) {
      setData((prevData) => {
        const existingProduct = prevData.find(
          (item) => item.key === selectedProduct.key
        );

        if (existingProduct) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng
          return prevData.map((item) =>
            item.key === selectedProduct.key
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Nếu sản phẩm chưa tồn tại, thêm vào bảng
          return [...prevData, { ...selectedProduct }];
        }
      });
    }

    // Xóa giá trị ô tìm kiếm sau khi thêm sản phẩm
  };

  const handleDelete = (key: number) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  const handleQuantityChange = (key: number, value: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, quantity: value } : item
      )
    );
  };

  return (
    <>
      <Row className="mb-3">
        <Space className="flex flex-row " direction="vertical">
          <Link href="/admin/orders">
            <Button
              className="me-3"
              icon={<ArrowLeftOutlined />}
              iconPosition={"start"}
            ></Button>
          </Link>
          <Typography.Title level={3}>Tạo đơn hàng</Typography.Title>
        </Space>
      </Row>
      <Row gutter={[16, 16]}>
        {/* Cột chính */}
        <Col span={16}>
          <Card title="Sản phẩm">
            <Space direction="vertical" style={{ width: "100%" }}>
              <AutoComplete
                options={options}
                onSearch={handleSearch}
                onSelect={handleSelect}
                onFocus={showAllOptions}
                style={{ width: "100%" }}
                value={searchText}
              >
                <Input.Search
                  placeholder="Tìm theo tên, mã SKU... (F3)"
                  enterButton="Chọn nhiều"
                  value={searchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  allowClear
                />
              </AutoComplete>
              {data.length > 0 && (
                <Table<Product>
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  rowKey="key"
                />
              )}
              {data.length === 0 && (
                <>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                      color: "#888",
                    }}
                  >
                    Bạn chưa thêm sản phẩm nào
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={showAllOptions}
                      className="text-blue-500 border-blue-500 font-bold"
                    >
                      Thêm sản phẩm
                    </Button>
                  </div>
                </>
              )}
              <Button type="dashed" block>
                + Thêm sản phẩm hoặc dịch vụ tùy chỉnh
              </Button>
            </Space>
          </Card>
          <Card title="Thanh toán" style={{ marginTop: 16 }}>
            <Row>
              <Col span={12}>Tổng tiền hàng</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ---
              </Col>
            </Row>
            <Row>
              <Col span={12}>Thêm giảm giá</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ---
              </Col>
            </Row>
            <Row>
              <Col span={12}>Thêm phí giao hàng</Col>
              <Col span={12} style={{ textAlign: "right" }}>
                ---
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <strong>Thành tiền</strong>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <strong>---</strong>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Cột bên */}
        <Col span={8}>
          <Card>
            <Form form={form} layout="vertical">
              <Form.Item label="Nguồn đơn" name="source">
                <Select placeholder="Chọn nguồn đơn" />
              </Form.Item>
              <Form.Item label="Khách hàng" name="customer">
                <Select placeholder="Tìm theo tên, SDT... (F4)" allowClear>
                  {dataCustomer.map((customer) => (
                    <Option
                      key={customer.id}
                      value={customer.id}
                      label={`${customer.customer_name} - ${customer.phone}`} // Nội dung hiển thị khi đã chọn
                    >
                      <div>
                        <strong>{customer.customer_name}</strong>
                        <br />
                        {customer.phone}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Nhân viên phụ trách" name="staff">
                <Select placeholder="Chọn nhân viên" allowClear>
                  {dataAccount.map((account) => (
                    <Option key={account.id} value={account.id}>
                      {account.username}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Ghi chú" name="notes">
                <TextArea placeholder="VD: Giao hàng trong giờ hành chính cho khách" />
              </Form.Item>
              <Form.Item label="Tag" name="tags">
                <Input placeholder="Tìm kiếm hoặc thêm mới tag" />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Divider />
        <Row style={{ marginLeft: "80%" }}>
          <Space className="flex flex-row " direction="vertical">
            <Button block> Lưu nháp</Button>
            <Button block type="primary">
              Tạo đơn hàng
            </Button>
          </Space>
        </Row>
      </Row>
    </>
  );
};

export default CreateOrder;
