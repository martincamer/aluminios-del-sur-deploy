import axios from 'axios';

export const aluminiosApi = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}`,
});
