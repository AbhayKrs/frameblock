import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

const baseURL = 'http://localhost:5000/api/v1';
const client = axios.create({ baseURL });
const client_post = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });
const client_form = axios.create({ baseURL, headers: { 'Content-Type': 'multipart/form-data' } });

export const googleRedirectURL = baseURL + "/users/googleAuth";

export const handle_user_signIn = async (isLoggedIn, payload) => {
    const res = await client_post.post('/users/signin', payload);
    const { token } = res.data;
    isLoggedIn ? localStorage.setItem('jwtToken', token) : sessionStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const loginData = jwt_decode(token);
    const response = { ...loginData, isSignedIn: true };
    return response;
}

export const handle_user_signUp = async (payload) => {
    const res = await client_post.post('/users/signup', payload);
    const { token } = res.data;
    sessionStorage.setItem('jwtToken', token);
    setAuthToken(token);

    const loginData = jwt_decode(token);
    const response = { ...loginData, isSignedIn: true };
    return response;
}

export const handle_user_signOut = async () => {
    if (localStorage.jwtToken) {
        localStorage.clear();
    } else if (sessionStorage.jwtToken) {
        sessionStorage.clear();
    }
}

export const fetch_user_info = async (id, isLoggedIn) => {
    const res = await client.get(`/users/${id}`);
    const { token } = res.data;
    if (localStorage.jwtToken) {
        localStorage.setItem('jwtToken', token);
    } else if (sessionStorage.jwtToken) {
        sessionStorage.setItem('jwtToken', token);
    }
    const userData = jwt_decode(token);
    return userData;
}

export const update_user_info = async (id, payload) => {
    await client_post.put(`/users/${id}`, payload);
    return;
}

export const delete_user = async (id) => {
    await client.delete(`/users/${id}`);
    if (localStorage.jwtToken) {
        localStorage.clear();
    } else if (sessionStorage.jwtToken) {
        sessionStorage.clear();
    }
    return;
}

// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
// export const handle_user_signIn = () => {}
