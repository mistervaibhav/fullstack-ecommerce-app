import axios from 'axios';
import { API } from '../config/api';

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
    //  console.log('success in login', response.data);
    return response;
  } catch (error) {
    //  console.log('error in login', error.response.data);
    return error.response;
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

export const authenticate = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(data));
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
