import axios from 'axios';
import { API } from '../../../app/api';

export const createCategory = async (userId, token, category) => {
  try {
    const response = await axios.post(`${API}/category/create/${userId}`, category, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
