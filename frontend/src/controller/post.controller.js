/** @format */

const { apiUrl } = require('../util/util');

const fetchPosts = async token => {
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    };

    const response = await fetch(apiUrl + '/posts', requestOptions);
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

module.exports = { fetchPosts };
