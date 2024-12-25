"use client";
import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";

const EditOrder = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams(); // Sử dụng hook useParams để lấy giá trị [id]
  const id = params.id; // id sẽ là giá trị động

  // Dữ liệu giả cho bảng sản phẩm
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  const data: any[] = []; // Dữ liệu trống ban đầu

  const handleCancel = () => {
    router.push("/admin/orders");
  };

  return (
    <>
      <Row className="mb-3">
        <Space className="flex flex-row " direction="vertical">
          <Button
            className="me-3"
            icon={<ArrowLeftOutlined />}
            iconPosition={"start"}
            onClick={handleCancel}
          ></Button>
          <Typography.Title level={3}>#{id}</Typography.Title>
        </Space>
      </Row>
      <Row gutter={[16, 16]}>
        {/* Cột chính */}
        <Col span={16}>
          <Card title="Sản phẩm">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input.Search
                placeholder="Tìm theo tên, mã SKU... (F3)"
                enterButton="Chọn nhiều"
              />
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                locale={{ emptyText: "Bạn chưa thêm sản phẩm nào" }}
              />
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
                <Input placeholder="Tìm theo tên, SDT... (F4)" />
              </Form.Item>
              <Form.Item label="Nhân viên phụ trách" name="staff">
                <Select placeholder="Chọn nhân viên" />
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

export default EditOrder;
