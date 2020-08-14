/** @format */

import React from 'react';

import { Stack, Box } from '@chakra-ui/core';

import MessageBoxComponent from '../message-box/message-box.component';
import MessageComponent from '../message/message.component';

import socketIOClient from 'socket.io-client';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messageController from '../../controller/message.controller';
import { setCurrentMessages } from '../../redux/messages/messages.actions';
import { selectCurrentMessages } from '../../redux/messages/messages.selector';
import { rehydrateMessages } from '../../redux/store';

class MessageWindowComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toId:
                this.props.currentUser.user.id === '5f36af2e76ae7765b8b96cf9'
                    ? '5f352848ba06d97b58d00744'
                    : '5f36af2e76ae7765b8b96cf9',
            messages: this.props.messages,
        };

        this.socket = socketIOClient('http://localhost:4040/', {
            query: `chatID=${props.currentUser.user.id}`,
        });

        this.socket.on('receive_message', message => {
            this.state.messages.push(message);
            rehydrateMessages(this.state.messages);
        });

        this.socket.on('sent_message', message => {
            console.log(message);
            this.state.messages.push(message);
            rehydrateMessages(this.state.messages);
        });
    }

    componentDidMount = async () => {
        const response = await messageController.getMessages(
            this.props.currentUser.user.id,
            this.state.toId,
            'Bearer ' + this.props.currentUser.tokens.access.token
        );

        if (!response.success) {
            alert('There was some error in retrieving messages');
        } else {
            rehydrateMessages(response.data);
            this.setState({
                ...this.state,
                messages: response.data,
            });
        }
    };

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        const { messages } = this.state;

        return (
            <Stack>
                <Box h='80vh' maxHeight='80vh' overflowY='auto' pt={5} pr={5}>
                    {messages.map(({ id, ...otherProps }) => {
                        return this.props.currentUser.user.id === otherProps.senderChatID ? (
                            <MessageComponent mine key={id} {...otherProps}></MessageComponent>
                        ) : (
                            <MessageComponent key={id} {...otherProps}></MessageComponent>
                        );
                    })}
                </Box>
                <Box h='8vh' pt='3vh'>
                    <MessageBoxComponent messages={messages}></MessageBoxComponent>
                </Box>
            </Stack>
        );
    }
}

const mapStateToProps = () =>
    createStructuredSelector({
        currentUser: selectCurrentUser,
        messages: selectCurrentMessages,
    });

const mapDispatchToProps = dispatch => {
    return {
        setCurrentMessages: messages => {
            dispatch(setCurrentMessages(messages));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageWindowComponent);
