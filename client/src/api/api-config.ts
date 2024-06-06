import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3002/api/v1'
});

export const setAuthToken = (token: string): void => { // this is for not setting Authorization on every server request
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } 
  else {
    delete api.defaults.headers.common['Authorization'];
  }
};