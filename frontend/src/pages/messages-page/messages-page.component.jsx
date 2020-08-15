/** @format */

import React from 'react';

import { Grid, Box, Heading, Button, Stack, useDisclosure } from '@chakra-ui/core';

import ChatListComponent from '../../components/chat-list/chat-list.component';
import MessageWindowComponent from '../../components/message-window/message-window.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import MembersListComponent from '../../components/members-list/members-list.component';

const MessagesPageComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Grid templateColumns='25vw 60vw' gap={10} p='0 5vw 0 5vw'>
                <Box overflowY='auto' maxHeight='100vh' borderRightWidth='2px'>
                    <Box shadow='lg' bg='#153754' color='#fff' p={5}>
                        <Stack isInline>
                            <Heading pt={1} fontSize='lg'>
                                Chats
                            </Heading>
                            <Button marginLeft='12rem' size='sm' variantColor='blue' onClick={onOpen}>
                                New Chat
                            </Button>
                        </Stack>
                    </Box>
                    <ChatListComponent></ChatListComponent>
                </Box>
                <Box overflowY='auto' h='90vh' maxHeight='90vh'>
                    <MessageWindowComponent></MessageWindowComponent>
                </Box>
            </Grid>
            <MembersListComponent isOpen={isOpen} onClose={onClose}></MembersListComponent>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(MessagesPageComponent);
