/** @format */

import React from 'react';

import { Button } from '@chakra-ui/core';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import likeController from '../../controller/like.controller';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { searchInArrayOfObjects } from '../../util/util';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);

        if (searchInArrayOfObjects(this.props.currentUser.user.id, this.props.likes, 'userId')) {
            this.state = {
                liked: true,
            };
        } else {
            this.state = {
                liked: false,
            };
        }
    }

    handleLike = async () => {
        const response = await likeController.sendLike(
            this.props.postId,
            this.props.currentUser.user.id,
            'Bearer ' + this.props.currentUser.tokens.access.token
        );

        if (!response.success) {
            alert('There was some error');
        } else {
            this.setState({
                liked: true,
            });
        }
    };

    handleUnlike = async () => {
        const response = await likeController.sendUnlike(
            this.props.postId,
            this.props.currentUser.user.id,
            'Bearer ' + this.props.currentUser.tokens.access.token
        );

        if (!response.success) {
            alert('There was some error');
        } else {
            this.setState({
                liked: false,
            });
        }
    };

    render() {
        return (
            <>
                {this.state.liked ? (
                    <Button bg='white' ml='72%' onClick={this.handleUnlike}>
                        <BsHeartFill />
                    </Button>
                ) : (
                    <Button bg='white' ml='72%' onClick={this.handleLike}>
                        <BsHeart />
                    </Button>
                )}
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(LikeButton);
