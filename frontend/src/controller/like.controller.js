/** @format */

const { apiUrl } = require('../util/util');

const sendLike = async (postId, userId, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ postId, userId }),
    };

    const response = await fetch(apiUrl + '/likes', requestOptions);
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

const sendUnlike = async (postId, userId, token) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ postId, userId }),
    };

    const response = await fetch(apiUrl + '/likes', requestOptions);

    if (!response.ok) {
        const data = await response.json();
        const error = (data && data.message) || response.status;
        return {
            success: false,
            data: error,
        };
    } else {
        return {
            success: true,
        };
    }
};

module.exports = { sendLike, sendUnlike };
