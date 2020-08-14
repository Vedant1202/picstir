/** @format */

const { apiUrl } = require('../util/util');

const getMembers = async (userId, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ userId }),
    };
    const getUrl = apiUrl + '/users/getMembers';

    const response = await fetch(getUrl, requestOptions);
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
    getMembers,
}
