import axios from "axios";
const BASE_URL = 'http://localhost:5050';
import Cookies from 'js-cookie';

const getToken = (): string | null => {
    if (!localStorage.getItem('token') && !localStorage.getItem('userID')) return null
    return `Bearer ${localStorage.getItem('token')} User ${localStorage.getItem('userID')}`
};

export const httpGet = async (url: string) => {
    const response = await axios.get(`${BASE_URL}${url}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
};

export const httpPost = async (url: string, data: any) => {
    console.log(Cookies.get('token')||'not cookies set yet');
    const response = await axios.post(`${BASE_URL}${url}`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
};