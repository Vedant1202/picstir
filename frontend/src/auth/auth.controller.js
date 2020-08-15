/** @format */

const { apiUrl } = require('../util/util');

const login = async (email, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    };

    const response = await fetch(apiUrl + '/auth/login', requestOptions);
    const data = await response.json();

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return {
            success: false,
            data: error,
        };
    } else {
        return {
            success: true,
            data: data,
        };
    }
};

const register = async (email, password, name, username, file) => {
    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);
    fd.append('name', name);
    fd.append('username', username);
    fd.append('profilePicture', file);

    const requestOptions = {
        method: 'POST',
        body: fd,
    };

    const response = await fetch(apiUrl + '/auth/register', requestOptions);
    const data = await response.json();

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return {
            success: false,
            data: error,
        };
    } else {
        return {
            success: true,
            data: data,
        };
    }
};

module.exports = {
    login,
    register,
};
