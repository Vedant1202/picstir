/** @format */

import React from 'react';

import { Input, Stack, Button } from '@chakra-ui/core';
import { IoIosSend } from 'react-icons/io';

import { messageController } from '../../controller';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { socketUrl } from '../../util/util';
import { setCurrentMessages } from '../../redux/messages/messages.actions';
import { selectCurrentMessages } from '../../redux/messages/messages.selector';

class MessageBoxComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messages: this.props.messages,
        };

        this.socket = socketIOClient(socketUrl, {
            query: `chatID=${props.currentUser.user.id}&token=${props.currentUser.tokens.access.token}`,
        });
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            message: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        if (this.state.message !== '') {
            const response = await messageController.sendMessage(
                this.state.message,
                this.props.currentUser.user.id,
                this.props.currentUser.user.id === '5f36af2e76ae7765b8b96cf9'
                    ? '5f37942f44af469488051eb9'
                    : '5f36af2e76ae7765b8b96cf9',
                'Bearer ' + this.props.currentUser.tokens.access.token
            );

            if (!response.success) {
                alert('There was some error');
            } else {
                this.socket.emit('send_message', response.data);
                this.setState({
                    ...this.state,
                    message: '',
                });
            }
        }
    };

    componentWillUnmount() {
        this.socket.disconnect();
    }

    render() {
        return (
            <Stack isInline>
                <Input value={this.state.message} placeholder='Start typing...' w='55vw' onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}>
                    <IoIosSend />
                </Button>
            </Stack>
        );
    }
}

const mapStateToProps = createStructuredSelector({
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

export default connect(mapStateToProps, mapDispatchToProps)(MessageBoxComponent);
