/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../redux/user/user.selector';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Stack,
} from '@chakra-ui/core';

import NewPostFormComponent from '../components/new-post-form/new-post-form.component';

const NewPostComponent = ({ currentUser, post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button w='100%' variantColor='blue' onClick={onOpen}>
                Create New Post
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={3}>
                            <NewPostFormComponent></NewPostFormComponent>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(NewPostComponent);
