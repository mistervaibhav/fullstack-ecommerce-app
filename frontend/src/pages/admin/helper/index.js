import axios from 'axios';
import { API } from '../../../config/api';

/**
 * * POST
 * * CREATE CATEGORY
 */
export const createCategory = async (userId, token, category) => {
  try {
    const response = await axios.post(`${API}/category/create/${userId}`, category, {
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
    const response = await axios.post(`${API}/products/create/${userId}`, product, {
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
    const response = await axios.get(`${API}/category/all`);
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
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API}/${productId}`);
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
    const response = await axios.get(`${API}/products/all`);
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
    const response = await axios.delete(`${API}/products/${productId}/${userId}`, {
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
    const response = await axios.put(`${API}/products/${productId}/${userId}`, product, {
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
