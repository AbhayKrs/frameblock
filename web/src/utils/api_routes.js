import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { HANDLE_SIGNIN } from '../store/reducers/user.reducers';

const baseURL = 'http://localhost:5000/api/v1';
// const baseURL = 'https://frameblock.onrender.com/api/v1';
const client = axios.create({ baseURL });
const client_post = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } });

export const googleRedirectURL = baseURL + "/users/googleAuth";

export const fetch_templates = async () => {
    const res = await client.get('/templates');
    return res.data;
}

export const handle_user_signIn = async (dispatch, navigate, isLoggedIn, payload) => {
    await client_post.post('/users/signin', payload).then(res => {
        console.log("res", res);
        const { token } = res.data;
        isLoggedIn ? localStorage.setItem('jwtToken', token) : sessionStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const loginData = jwt_decode(token);
        const response = { ...loginData, isSignedIn: true };
        dispatch(HANDLE_SIGNIN(response));
        navigate('/');
    }).catch(err => {
        console.log("err", err);
        // navigate('/');
    });
    return;
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

export const fetch_user_info = async (userID, isLoggedIn) => {
    const res = await client.get(`/users/${userID}`);
    const { token } = res.data;
    if (localStorage.jwtToken) {
        localStorage.setItem('jwtToken', token);
    } else if (sessionStorage.jwtToken) {
        sessionStorage.setItem('jwtToken', token);
    }
    const userData = jwt_decode(token);
    return userData;
}

export const update_user_info = async (userID, payload) => {
    await client_post.put(`/users/${userID}`, payload);
    return;
}

export const delete_user = async (userID) => {
    await client.delete(`/users/${userID}`);
    if (localStorage.jwtToken) {
        localStorage.clear();
    } else if (sessionStorage.jwtToken) {
        sessionStorage.clear();
    }
    return;
}

export const create_user_draft = async (payload) => {
    await client_post.post('/drafts/create', payload);
    return;
}

export const fetch_user_drafts = async (userID) => {
    const res = await client.get(`/users/${userID}/drafts`);
    return res.data;
}

export const delete_user_draft = async (draftID) => {
    await client.delete(`/drafts/${draftID}`);
    return;
}

export const duplicate_user_draft = async (payload) => {
    await client_post.post('/drafts/duplicate', payload);
    return;
}

export const edit_user_draft = async (draftID, payload) => {
    await client_post.put(`/drafts/${draftID}`, payload);
    return;
}

export const fetch_draft = async (draftID) => {
    const res = await client.get(`/drafts/${draftID}`);
    return res.data;
}

export const download_draft = async (payload) => {
    console.log("--- payload", payload)
    const response = await fetch(baseURL + "/pdf/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const blob = await response.blob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${payload.name}.pdf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    return;
}