/** @format */

const { apiUrl } = require('../util/util');

// $(() => {
//     if (!getData('user')) {
//         Nav.replace('login.html');
//     }

//     $("#send").click(() => {
//         sendMessage({
//             from: getData('user').user.name,
//             text: $("#message").val(),
//             senderChatID: getData('user').user.id,
//             receiverChatID: getData('room').receiverChatID
//         });
//     })

//     getMessages();
//     socket.on('receive_message', addMessages);
// })

const getMessages = async (senderChatID, receiverChatID, token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    const getUrl = apiUrl + '/messages?userId=' + senderChatID + '&toId=' + receiverChatID;

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

const sendMessage = async (text, senderChatID, receiverChatID, token) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ text, senderChatID, receiverChatID }),
    };

    const response = await fetch(apiUrl + '/messages', requestOptions);
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
    getMessages,
    sendMessage,
};
