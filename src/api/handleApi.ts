import axiosApi from "@/api/axiosApi";

// Định nghĩa các endpoint API
const END_POINT = {
  LOGIN: "/login.php",
  GET_ALL_ACCOUNTS: "/get_all_accounts.php",
  GET_ALL_PRODUCTS: "/product/show_products.php",
  PRODUCT: "/product/qlsp.php",
  GET_PRODUCT_BY_ID: "/product/show_product_by_id.php",
  GET_ALL_CUSTOMERS: "/customer/get_customers.php",
  GET_CUSTOMER_BY_ID: "/customer/get_customer_by_id.php",
  GET_ALL_ORDER: "/order/get_orders.php",
  GET_ALL_CATE_PRODUCT: "/cate/categories.php",
};
//Hàm gọi api order
export const getAllOrderAPI = async (
  token: string,
  page: string,
  limit: string
) => {
  const response = await axiosApi.post(END_POINT.GET_ALL_ORDER, {
    session_token: token,
    page: page,
    limit: limit,
  });
  return response.data;
};

// Hàm gọi API để lấy danh sách khách hàng
export const getCustomersAPI = async (token: string) => {
  try {
    const response = await axiosApi.post(END_POINT.GET_ALL_CUSTOMERS, {
      session_token: token,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching customers:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm gọi API đăng nhập
export const loginAPI = async (username: string, password: string) => {
  const response = await axiosApi.post(END_POINT.LOGIN, {
    username,
    password,
  });
  return response.data;
};

// Hàm gọi API để lấy danh sách sản phẩm
export const getProductsAPI = async (token: string) => {
  try {
    const response = await axiosApi.post(END_POINT.GET_ALL_PRODUCTS, {
      session_token: token,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm gọi API để lấy thêm sản phẩm
export const addProductsAPI = async (dataProduct: any) => {
  try {
    const response = await axiosApi.post(END_POINT.PRODUCT, {
      session_token: dataProduct.token,
      category_id: dataProduct.cate,
      product_name: dataProduct.product_name,
      rules: dataProduct.product_rules,
      notes: dataProduct.product_decription,
      product_avatar: dataProduct.product_avatar,
      nhieuquycach: true,
      pricing: [
        {
          product_price_first: dataProduct.product_price_first,
          product_price: dataProduct.product_price,
          product_price1: dataProduct.product_price1,
          product_barcode: dataProduct.product_barcode,
          product_sku: dataProduct.product_sku,
        },
      ],
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editProductsAPI = async (dataProduct: any) => {
  try {
    const response = await axiosApi.put(END_POINT.PRODUCT, {
      session_token: dataProduct.token,
      id: dataProduct.id,
      category_id: dataProduct.cate,
      product_name: dataProduct.product_name,
      rules: dataProduct.product_rules,
      notes: dataProduct.product_decription,
      product_avatar: dataProduct.avatar,
      existingAvatars: dataProduct.avatar1,
      nhieuquycach: true,
      pricing: [
        {
          product_price_first: dataProduct.product_price_first,
          product_price: dataProduct.product_price,
          product_price1: dataProduct.product_price1,
          product_barcode: dataProduct.product_barcode,
          product_sku: dataProduct.product_sku,
        },
      ],
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm gọi API để lấy xóa sản phẩm
export const deleteProductsAPI = async (token: string, id: string) => {
  try {
    const response = await axiosApi.delete(END_POINT.PRODUCT, {
      data: {
        session_token: token,
        id: id,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deleting products:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm gọi API để lấy chi tiết sản phẩm theo ID
export const getProductByIdAPI = async (token: string, productId: string) => {
  try {
    const response = await axiosApi.get(
      `${END_POINT.GET_PRODUCT_BY_ID}?session_token=${token}&product_id=${productId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching product by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hàm gọi API để lấy danh sách tài khoản
export const getAccountsAPI = async (token: string) => {
  const response = await axiosApi.get(END_POINT.GET_ALL_ACCOUNTS, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const getAllCateProductAPI = async (token: string) => {
  const response = await axiosApi.get(END_POINT.GET_ALL_CATE_PRODUCT, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};
