import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://dw17vhiy-waysgallery-api.herokuapp.com/api/v1',
});
