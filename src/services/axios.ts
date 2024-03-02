import axios from 'axios';

export const api = axios.create({
    baseURL:'https://drago-tech.vercel.app/api/'
})