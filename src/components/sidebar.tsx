"use client";
import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  theme,
} from "antd";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import HouseSidingIcon from "@mui/icons-material/HouseSiding";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/login/AuthContext";
import PageDashboard from "@/app/admin/dashboard/page";
import PageOrder from "@/app/admin/(order)/orders/page";
import Draft_orders from "@/app/admin/(order)/draft_orders/page";
import Order_returns from "@/app/admin/(order)/order_returns/page";
import Checkouts from "@/app/admin/(order)/checkouts/page";
import Shipments from "@/app/admin/shipments/page";
import Reports from "@/app/admin/shipments/reports/page";
import Products from "@/app/admin/(product)/products/page";
import Collections from "@/app/admin/(product)/collections/page";
import Inventories from "@/app/admin/(warehouse)/inventories/page";
import Purchase_orders from "@/app/admin/(warehouse)/purchase_orders/page";
import Receive_inventories from "@/app/admin/(warehouse)/receive_inventories/page";
import Supplier_returns from "@/app/admin/(warehouse)/supplier_returns/page";
import Stock_transfers from "@/app/admin/(warehouse)/stock_transfers/page";
import Suppliers from "@/app/admin/(warehouse)/suppliers/page";
import Customers from "@/app/admin/(customer)/customers/page";
import Customer_groups from "@/app/admin/(customer)/customer_groups/page";
import Discounts from "@/app/admin/discounts/page";
import Cash_book from "@/app/admin/cash_book/page";
import List from "@/app/admin/report/list/page";
import Settings from "@/app/admin/settings/store/page";
import ReportsAll from "@/app/admin/report/page";
import CreateOrder from "@/app/admin/(order)/orders/create/page";
import EditOrder from "@/app/admin/(order)/orders/[id]/page";
import CreateProduct from "@/app/admin/(product)/products/create/page";
import EditProduct from "@/app/admin/(product)/products/[id]/page";

const { Header, Sider, Content } = Layout;
const ContentArea: React.FC = () => {
  const pathname: string = usePathname();
  const id = pathname.split("/").pop();
  // Render nội dung dựa trên URL
  switch (pathname) {
    case "/":
      return <PageDashboard />;
    case "/admin/dashboard":
      return <PageDashboard />;
    case "/admin/orders":
      return <PageOrder />;
    case "/admin/orders/create":
      return <CreateOrder />;
    case `/admin/orders/${id}`:
      return <EditOrder />;

    case "/admin/draft_orders":
      return <Draft_orders />;
    case "/admin/order_returns":
      return <Order_returns />;
    case "/admin/checkouts":
      return <Checkouts />;
    case "/admin/shipments/reports":
      return <Reports />;
    case "/admin/shipments":
      return <Shipments />;
    case "/admin/products":
      return <Products />;
    case "/admin/products/create":
      return <CreateProduct />;
    case `/admin/products/${id}`:
      return <EditProduct />;

    case "/admin/collections":
      return <Collections />;
    case "/admin/inventories":
      return <Inventories />;
    case "/admin/purchase_orders":
      return <Purchase_orders />;
    case "/admin/receive_inventories":
      return <Receive_inventories />;
    case "/admin/supplier_returns":
      return <Supplier_returns />;
    case "/admin/stock_transfers":
      return <Stock_transfers />;
    case "/admin/suppliers":
      return <Suppliers />;
    case "/admin/customers":
      return <Customers />;
    case "/admin/customer_groups":
      return <Customer_groups />;
    case "/admin/discounts":
      return <Discounts />;
    case "/admin/cash_book":
      return <Cash_book />;
    case "/admin/report":
      return <ReportsAll />;
    case "/admin/report/list":
      return <List />;
    case "/admin/settings/store":
      return <Settings />;
  }

  // Mặc định cho các trang khác
  return <h1>Trang không xác định</h1>;
};
const Sidebar: React.FC = () => {
  interface MenuItem {
    key: string;
    label: string;
    url?: string;
    children?: MenuItem[]; // menu con có thể có hoặc không
  }

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>(
    JSON.parse(localStorage.getItem("openKeys") || "[]")
  ); // Khôi phục trạng thái openKeys từ localStorage
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    JSON.parse(localStorage.getItem("selectedKeys") || "[]")
  ); // Khôi phục trạng thái selectedKeys từ localStorage
  const [cachedOpenKeys, setCachedOpenKeys] = useState<string[]>([]); // Lưu trạng thái trước khi collapsed

  useEffect(() => {
    const storedSelectedKeys = localStorage.getItem("selectedKeys");
    if (storedSelectedKeys) {
      setSelectedKeys(JSON.parse(storedSelectedKeys)); // Cập nhật từ localStorage
    }
    const url: any = localStorage.getItem("urlcurent");
    router.push(url);
  }, []);

  useEffect(() => {
    localStorage.setItem("openKeys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    localStorage.setItem("selectedKeys", JSON.stringify(selectedKeys));
  }, [selectedKeys]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const { logout } = useAuth();

  // Dữ liệu menu
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Tổng quan",
      url: "/admin/dashboard",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Đơn hàng",
      url: "/admin/orders",
      children: [
        {
          key: "2-1",
          label: "Danh sách đơn hàng",
          url: "/admin/orders",
        },
        {
          key: "2-2",
          label: "Đơn hàng nháp",
          url: "/admin/draft_orders",
        },
        {
          key: "2-3",
          label: "Trả hàng",
          url: "/admin/order_returns",
        },
        {
          key: "2-4",
          label: "Đơn chưa hoàn tất",
          url: "/admin/checkouts",
        },
      ],
    },
    {
      key: "3",
      label: "Vận chuyển",
      icon: <AirportShuttleIcon />,
      url: "/admin/shipments/reports",
      children: [
        {
          key: "3-1",
          label: "Tổng quan",
          url: "/admin/shipments/reports",
        },
        {
          key: "3-2",
          label: "Vận đơn",
          url: "/admin/shipments",
        },
      ],
    },
    {
      key: "4",
      label: "Sản phẩm",
      icon: <CardGiftcardIcon />,
      url: "/admin/products",
      children: [
        {
          key: "4-1",
          label: "Danh sách sản phẩm",
          url: "/admin/products",
        },
        {
          key: "4-2",
          label: "Danh mục sản phẩm",
          url: "/admin/collections",
        },
      ],
    },
    {
      key: "5",
      label: "Quản lý kho",
      icon: <HouseSidingIcon />,
      url: "/admin/inventories",
      children: [
        {
          key: "5-1",
          label: "Tồn kho",
          url: "/admin/inventories",
        },
        {
          key: "5-2",
          label: "Đặt hàng nhập",
          url: "/admin/purchase_orders",
        },
        {
          key: "5-3",
          label: "Nhập hàng",
          url: "/admin/receive_inventories",
        },
        {
          key: "5-4",
          label: "Trả hàng nhập",
          url: "/admin/supplier_returns",
        },
        {
          key: "5-5",
          label: "Chuyển kho",
          url: "/admin/stock_transfers",
        },
        {
          key: "5-6",
          label: "Nhà cung cấp",
          url: "/admin/suppliers",
        },
      ],
    },
    {
      key: "6",
      label: "Khách hàng",
      icon: <PersonIcon />,
      url: "/admin/customers",
      children: [
        {
          key: "6-1",
          label: "Khách hàng",
          icon: <DescriptionIcon />,
          url: "/admin/customers",
        },
        {
          key: "6-2",
          label: "Nhóm khách hàng",
          icon: <DescriptionIcon />,
          url: "/admin/customer_groups",
        },
      ],
    },
    {
      key: "7",
      label: "Khuyến mãi",
      icon: <LayersIcon />,
      url: "/admin/discounts",
    },
    {
      key: "8",
      label: "Sổ quỹ",
      icon: <LayersIcon />,
      url: "/admin/cash_book",
    },
    {
      key: "9",
      label: "Báo cáo",
      icon: <BarChartIcon />,
      url: "/admin/report",
      children: [
        {
          key: "9-1",
          label: "Tổng quan báo cáo",
          url: "/admin/report",
        },
        {
          key: "9-2",
          label: "Danh sách báo cáo",
          url: "/admin/list",
        },
      ],
    },
    {
      key: "10",
      label: "Cấu hình",
      icon: <SettingsIcon />,
      url: "/admin/settings/store",
    },
  ];

  // Xử lý trạng thái mở menu cha
  const handleOpenChange = (keys: string[]) => {
    const newlyOpenedKey = keys.find((key) => !openKeys.includes(key)); // Tìm menu cha mới được mở

    if (!collapsed && newlyOpenedKey) {
      setOpenKeys([newlyOpenedKey]); // Mở menu cha mới

      // Kiểm tra nếu chưa có mục con nào trong menu cha được chọn
      const parentMenu = menuItems.find((item) => item.key === newlyOpenedKey);
      if (
        parentMenu?.children &&
        !selectedKeys.some((key) => key.startsWith(newlyOpenedKey))
      ) {
        const firstChildItem = parentMenu.children[0]; // Mục con đầu tiên
        console.log(firstChildItem);
        if (firstChildItem?.url) {
          router.push(firstChildItem.url); // Điều hướng đến URL mục con đầu tiên
        }
        if (firstChildItem?.key) {
          setSelectedKeys([firstChildItem.key]); // Chọn mục con đầu tiên
        }
      }
    } else {
      // Khi menu bị thu nhỏ hoặc các trường hợp khác, cập nhật trạng thái mở
      setOpenKeys(keys);
    }
  };

  // Tìm mục menu theo key
  const findMenuItemByKey = (
    items: MenuItem[],
    key: string
  ): MenuItem | null => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children) {
        const childItem = findMenuItemByKey(item.children, key);
        if (childItem) return childItem;
      }
    }
    return null;
  };

  // Xử lý khi người dùng chọn mục menu
  const handleSelect = ({ key }: { key: string }) => {
    // Tìm URL của mục được chọn
    const selectedItem = findMenuItemByKey(menuItems, key);

    if (selectedItem?.url) {
      // Điều hướng trước khi cập nhật selectedKeys
      router.push(selectedItem.url);
      localStorage.urlcurent = selectedItem.url;
    }

    setSelectedKeys([key]); // Cập nhật selectedKeys ngay sau khi điều hướng

    // Mở menu cha chứa mục con đang được chọn
    const parentKey = menuItems.find((item) =>
      item.children?.some((child) => child.key === key)
    )?.key;

    if (parentKey) {
      setOpenKeys([parentKey]); // Đảm bảo mở menu cha
    } else {
      setOpenKeys([]); // Nếu mục không có cha, đóng các menu khác
    }
  };

  // Xử lý trạng thái thu nhỏ
  const toggleCollapsed = () => {
    if (!collapsed) {
      // Khi thu nhỏ, lưu trạng thái hiện tại
      setCachedOpenKeys(openKeys);
      setOpenKeys([]); // Đóng toàn bộ menu
    } else {
      // Khi mở rộng, khôi phục trạng thái trước đó
      setOpenKeys(cachedOpenKeys);
    }
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuUsers: MenuProps["items"] = [
    { key: "1", label: "Profile" },
    { key: "2", label: <span onClick={handleLogout}>Đăng xuất</span> },
  ];

  return (
    <Layout>
      <Sider
        style={{ height: "100vh" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{ border: "none", marginTop: "1rem" }}
          theme="dark"
          triggerSubMenuAction={collapsed ? "hover" : "click"}
          mode="inline"
          openKeys={collapsed ? undefined : openKeys} // Quản lý trạng thái menu cha mở
          selectedKeys={selectedKeys} // Quản lý trạng thái mục con được chọn
          onOpenChange={handleOpenChange} // Hàm xử lý trạng thái mở menu cha
          onSelect={handleSelect} // Hàm xử lý khi chọn mục menu
          items={menuItems}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between"
          style={{ padding: 0, background: colorBgContainer, display: "flex" }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed} // Sử dụng hàm toggleCollapsed thay vì thay đổi trực tiếp collapsed
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center">
            <Input
              className=" me-4"
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{
                width: "300px",
                borderRadius: "4px",
              }}
            />
            <div className=" me-4 flex items-center">
              <Avatar
                style={{
                  backgroundColor: "#1890ff",
                }}
                className=" me-3"
              >
                M
              </Avatar>
              <Dropdown menu={{ items: menuUsers }} trigger={["click"]}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center text-black me-3"
                >
                  {localStorage.getItem("username")}
                  <DownOutlined
                    size={2}
                    style={{ marginLeft: 5, fontSize: "8px" }}
                  />
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          <ContentArea />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
