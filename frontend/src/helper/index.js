import axios from 'axios';
// import { API } from '../config/api';

/**
 * * POST
 * * CREATE CATEGORY
 */
export const createCategory = async (userId, token, category) => {
  try {
    const response = await axios.post(`/category/create/${userId}`, category, {
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
    const response = await axios.post(`/products/create/${userId}`, product, {
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
    const response = await axios.get(`/category/all`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data);
    return error.response.data;
  }
};

/**
 * * GET
 * * GET A PRODUCT
 */
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
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
    const response = await axios.get(`/products/all`);
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
    const response = await axios.delete(`/products/${productId}/${userId}`, {
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
    const response = await axios.put(`/products/${productId}/${userId}`, product, {
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
