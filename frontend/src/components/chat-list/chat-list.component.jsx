/** @format */

import React from 'react';

import { Stack } from '@chakra-ui/core';

import ChatItemComponent from '../chat-item/chat-item.component';

// const ChatItemComponent = ({ name, imageUrl, ...otherProps }) => {
const ChatListComponent = () => {
    return (
        <Stack>
            <ChatItemComponent active></ChatItemComponent>
            <ChatItemComponent></ChatItemComponent>
            <ChatItemComponent></ChatItemComponent>
        </Stack>
    );
};

export default ChatListComponent;
