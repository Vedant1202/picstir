/** @format */

import React from 'react';

import {
    Box,
    Button,
    RadioButtonGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import userController from '../../controller/user.controller';
import MessageMemberRadioComponent from '../message-member-radio/message-member-radio.component';

class MembersListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            members: [],
        };
    }

    componentDidMount = async () => {
        const response = await userController.getMembers(
            this.props.currentUser.user.id,
            'Bearer ' + this.props.currentUser.tokens.access.token
        );

        if (!response.success) {
            alert('There was some error. \nMessage: ' + String(response.data));
            console.log(response.data);
        } else {
            this.setState({
                ...this.state,
                members: response.data,
            });
        }
    }

    handleChange = id => {
        this.setState({
            ...this.state,
            selected: id,
        });
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { members } = this.state;

        return (
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Members List</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RadioButtonGroup
                            mt='2vh'
                            onChange={val => {
                                this.handleChange(val);
                            }}
                        >
                            {
                                members.map(({ id, name, ...otherProps }) => (
                                    <MessageMemberRadioComponent key={id} value={id} {...otherProps} nameOfUser={name}/>
                                ))
                            }
                        </RadioButtonGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} variant='ghost' onClick={onClose}>
                            Close
                        </Button>
                        <Button variantColor='blue'>Create Chat</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(MembersListComponent);
