import axios from 'axios';

export const ROOT_URL = `http://localhost:3002/placeRouts`;
export const APP_URL = `http://localhost:3002/placeRouts`;

//the api call
const api = axios.create({
	baseURL: ROOT_URL,
});
//the header for the token
const authHeader = (token: string) => {
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json',
	};
};

export const getData = async (endPoint: string, token: string) => {
	try {
		const res: any = await api.get(endPoint, {
			headers: authHeader(token),
		});
		return res;
	} catch (error) {
		return error;
	}
};
export const regEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
export const regPass = /^[0-9][0-9][0-9][0-9]$/;
// export const getUserData = async (endPoint, token) => {
//   try {
//     const { data } = await api.get(endPoint, {
//       headers: authHeader(token),
//     });
//     return data;
//   } catch (error) {
//     return error;
//   }
// };
