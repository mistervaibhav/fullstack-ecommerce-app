import axios from 'axios';

/**
 * * POST
 * * CREATE CATEGORY
 */
export const createCategory = async (userId, token, category) => {
  try {
    const response = await axios.post(`/api/category/create/${userId}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * POST
 * * CREATE PRODUCT
 */
export const createProduct = async (userId, token, product) => {
  try {
    const response = await axios.post(`/api/products/create/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * GET
 * * GET ALL CATEGORIES
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(`/api/category/all`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * GET
 * * GET A PRODUCT BY ID
 */
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/api/products/${productId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * GET
 * * GET PRODUCTS BY CATEGORY
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`/api/products/${category}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * GET
 * * GET ALL PRODUCTS
 */
export const getProducts = async () => {
  try {
    const response = await axios.get(`/api/products/all`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * DELETE
 * * DELETE A PRODUCT
 */
export const deleteProduct = async (productId, userId, token) => {
  try {
    const response = await axios.delete(`/api/products/${productId}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * PUT
 * * UPDATE A PRODUCT
 */
export const updateProduct = async (productId, userId, token, product) => {
  try {
    const response = await axios.put(`/api/products/${productId}/${userId}`, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * ADD ITEM TO CART USING LOCALSTORAGE
 */
export const addItemToCart = (item) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({ ...item });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
/**
 * * REMOVE ITEM FROM CART
 */
export const removeItemFromCart = (productId) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
};

/**
 * * LOAD CART ITEMS FROM LOCALSTORAGE
 */
export const loadItemsFromCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};
