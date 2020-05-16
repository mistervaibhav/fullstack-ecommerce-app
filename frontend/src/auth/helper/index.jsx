import axios from 'axios';
import { API } from '../../backend';

/*----------------------------------------------------------------------------------------------- */

export const register = async (data) => {
  try {
    const response = await axios.post(`${API}/register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/*----------------------------------------------------------------------------------------------- */

export const login = async (data) => {
  try {
    const response = await axios.post(`${API}/login`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/*----------------------------------------------------------------------------------------------- */

export const logout = async (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    next();
    return await fetch(`${API}/logout`, {
      method: 'GET',
    })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
};

/*----------------------------------------------------------------------------------------------- */

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(data));
    next();
  }
};

/*----------------------------------------------------------------------------------------------- */

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }

  if (localStorage.getItem('token')) {
    return JSON.parse(localStorage.getItem('token'));
  } else {
    return false;
  }
};

/*----------------------------------------------------------------------------------------------- */
