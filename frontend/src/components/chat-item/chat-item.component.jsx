/** @format */

import React from 'react';

import { Box, Heading, Text, Avatar, Stack } from '@chakra-ui/core';

// const ChatItemComponent = ({ name, imageUrl, ...otherProps }) => {
class ChatItemComponent extends React.Component {
    render() {
        let active = false;
        if (this.props.active) {
            active = true;
        }
        return (
            <Box p={5} borderWidth='1px' cursor='pointer' bg={active ? '#f0f0f0' : '#fff'}>
                <Stack isInline>
                    <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                    <Stack pl='5px'>
                        <Heading fontSize='lg'>Prosper Otemuyiwa</Heading>
                        <Text>Hello</Text>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}

export default ChatItemComponent;
