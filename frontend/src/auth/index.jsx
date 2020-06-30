import axios from 'axios';

/*----------------------------------------------------------------------------------------------- */

export const register = async (data) => {
  try {
    const response = await axios.post(`/api/register`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

/*----------------------------------------------------------------------------------------------- */

export const login = async (data) => {
  try {
    const response = await axios.post(`/api/login`, data);
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
    return await fetch(`/api/logout`, {
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
