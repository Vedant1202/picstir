/** @format */

import React from 'react';

import {
    Grid,
    Box,
    Heading,
    Button,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/core';

import ChatListComponent from '../../components/chat-list/chat-list.component';
import MessageWindowComponent from '../../components/message-window/message-window.component';
import userController from '../../controller/user.controller';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';

class MessagesPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toId: null,
            members: [],
            isOpen: false,
        };
    }

    componentDidMount = async () => {
        const response = await userController.getMembers(
            this.props.currentUser.user.id,
            'Bearer ' + this.props.currentUser.tokens.access.token
        );

        if (!response.success) {
            alert('There was some error in retrieving messages');
        } else {
            this.setState({
                ...this.state,
                members: response.data,
            });
        }
    };

    onOpen = () => {
        this.setState({
            ...this.state,
            isOpen: true,
        });
    };

    onClose = () => {
        this.setState({
            ...this.state,
            isOpen: false,
        });
    };

    render() {
        // const { isOpen, onOpen, onClose } = useDisclosure();

        return (
            <>
                <Grid templateColumns='25vw 60vw' gap={10} p='0 5vw 0 5vw'>
                    <Box overflowY='auto' maxHeight='100vh' borderRightWidth='2px'>
                        <Box shadow='lg' bg='#153754' color='#fff' p={5}>
                            <Stack isInline>
                                <Heading pt={1} fontSize='lg'>
                                    Chats
                                </Heading>
                                <Button marginLeft='12rem' size='sm' variantColor='blue' onClick={this.onOpen}>
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
                <Modal isOpen={this.isOpen} onClose={this.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Members List</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody></ModalBody>
                        <ModalFooter>
                            <Button variantColor='blue' mr={3} onClick={this.onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(MessagesPageComponent);
