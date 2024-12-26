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

const CreateProduct = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const token: any = localStorage.getItem("authToken");
  const [dataAccount, setDataAccount] = useState<Account[]>([]);
  const [dataCustomer, setDataCustomer] = useState<Customer[]>([]);

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

  useEffect(() => {
    fetchDataAccount(token);
    fetchDataCustomer(token);
  }, [token]);

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
          <Typography.Title level={3}>Thêm sản phẩm</Typography.Title>
        </Space>
      </Row>
      <Row gutter={[16, 16]}>
        {/* Cột chính */}
        <Col span={16}>
          <Card title="Thông tin sản phẩm">
            <Form form={form} layout="vertical">
              <Form.Item label="Tên sản phẩm" name="source">
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
              <div className="flex w-full justify-between">
                <Form.Item
                  className="w-full"
                  label="Tên sản phẩm"
                  name="source"
                >
                  <Input className="w-[90%]" placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Tên sản phẩm"
                  name="source"
                >
                  <Input className="w-[100%]" placeholder="Nhập tên sản phẩm" />
                </Form.Item>
              </div>
              <div className="flex w-full justify-between">
                <Form.Item
                  className="w-full"
                  label="Tên sản phẩm"
                  name="source"
                >
                  <Input className="w-[90%]" placeholder="Nhập tên sản phẩm" />
                </Form.Item>
                <Form.Item className="w-full"></Form.Item>
              </div>
              <Form.Item label="Mô tả" name="source">
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Form>
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
              Thêm sản phẩm
            </Button>
          </Space>
        </Row>
      </Row>
    </>
  );
};

export default CreateProduct;
