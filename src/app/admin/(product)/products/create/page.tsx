"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { addProductsAPI, getAllCateProductAPI } from "@/api/handleApi";
import Link from "next/link";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface CateProduct {
  id: string;
  category_name: string;
  description: string;
}

const CreateProduct = () => {
  const [form] = Form.useForm();
  const token: any = localStorage.getItem("authToken");
  const [dataCateProduct, setDataCateProduct] = useState<CateProduct[]>([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const router = useRouter();

  const fetchDataCateProduct = async (token: string) => {
    try {
      const res = await getAllCateProductAPI(token);
      setDataCateProduct(res.categories);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchDataCateProduct(token);
  }, [token]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const customRequest = async ({ onError }: any) => {
    // Giả lập lỗi upload để hiển thị thông báo
    setTimeout(() => {
      onError(new Error("Tải ảnh thành công!"));
    }, 0);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleAddProduct = async () => {
    let formData = form.getFieldsValue();
    formData = {
      ...formData,
      product_avatar: fileList,
      token: token,
    };
    const res = await addProductsAPI(formData);
    if (res.success) {
      router.push("/admin/products");
    }
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <Row className="mb-3">
          <Space className="flex flex-row " direction="vertical">
            <Link href="/admin/products">
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
              <Form.Item label="Tên sản phẩm" name="product_name">
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
              <div className="flex w-full justify-between">
                <Form.Item className="w-full" label="Mã SKU" name="product_sku">
                  <Input
                    className="w-[90%]"
                    placeholder="Nhập mã SKU sản phẩm"
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Mã vạch/ Barcode"
                  name="product_barcode"
                >
                  <Input
                    className="w-[100%]"
                    placeholder="Nhập mã vạch/ Barcode sản phẩm"
                  />
                </Form.Item>
              </div>
              <div className="flex w-full justify-between">
                <Form.Item
                  className="w-full"
                  label="Đơn vị tính"
                  name="product_rules"
                >
                  <Input className="w-[90%]" placeholder="Nhập đơn vị tính" />
                </Form.Item>
                <Form.Item className="w-full"></Form.Item>
              </div>
              <Form.Item label="Mô tả" name="product_decription">
                <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>
            </Card>
            <Card title="Thanh toán" style={{ marginTop: 16 }}>
              <div className="flex w-full justify-between">
                <Form.Item
                  className="w-full"
                  label="Giá bán"
                  name="product_price"
                >
                  <Input className="w-[90%]" defaultValue={0} suffix="₫" />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Giá so sánh"
                  name="product_price1"
                >
                  <Input
                    className="w-[100%]"
                    placeholder="Nhập giá so sánh sản phẩm"
                    suffix="₫"
                  />
                </Form.Item>
              </div>
              <div className="flex w-full justify-between">
                <Form.Item
                  className="w-full"
                  label="Giá vốn"
                  name="product_price_first"
                >
                  <Input defaultValue={0} className="w-[90%]" suffix="₫" />
                </Form.Item>
                <Form.Item className="w-full"></Form.Item>
              </div>
            </Card>
          </Col>

          {/* Cột bên */}
          <Col span={8}>
            <Card>
              <Form.Item label="Ảnh sản phẩm">
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  customRequest={customRequest} // Sử dụng custom upload
                  locale={{
                    uploadError: "Tải lên thất bại", // Tùy chỉnh nội dung thông báo
                  }}
                >
                  {fileList.length < 0 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
                {/* CSS để thay đổi border */}
                <style jsx global>{`
                  .ant-upload-list-item-error {
                    border: 2px dashed green !important; /* Thay đổi border */
                  }
                `}</style>
              </Form.Item>
            </Card>
            <Card>
              <Form.Item label="Danh mục" name="catemain">
                <Select placeholder="Chọn danh mục" allowClear></Select>
              </Form.Item>
              <Form.Item label="Nhãn hiệu" name="brand">
                <Select placeholder="Chọn nhãn hiệu" allowClear></Select>
              </Form.Item>
              <Form.Item label="Loại sản phẩm" name="cate">
                <Select placeholder="Chọn loại sản phẩm" allowClear>
                  {dataCateProduct.map((account) => (
                    <Option key={account.id} value={account.id}>
                      {account.category_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Tag" name="tags">
                <Input placeholder="Tìm kiếm hoặc thêm mới tag" />
              </Form.Item>
            </Card>
          </Col>
          <Divider />
          <Row style={{ marginLeft: "80%" }}>
            <Space className="flex flex-row " direction="vertical">
              <Button block> Hủy</Button>
              <Button block type="primary" onClick={handleAddProduct}>
                Thêm sản phẩm
              </Button>
            </Space>
          </Row>
        </Row>
      </Form>
    </>
  );
};

export default CreateProduct;
