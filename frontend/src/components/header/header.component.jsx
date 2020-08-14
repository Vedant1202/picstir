/** @format */

import React from 'react';

import { Grid, Box, Link, Stack, Avatar } from '@chakra-ui/core';
import { BsFillChatFill } from 'react-icons/bs';
import './header.styles.scss';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { removeCurrentUser } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../util/util';

const Header = ({ currentUser, removeCurrentUser, history }) => (
    <Box className='header' boxShadow='md' h='8vh' p='1vh 10vw 0 10vw'>
        <Grid templateColumns='15vw 50vw 5vw 10vw' gap={6}>
            <Box w='100%'>
                {currentUser ? (
                    <Stack isInline spacing={4}>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        <span className='header-items'>{capitalizeFirstLetter(currentUser.user.name.split(' ')[0])}</span>
                    </Stack>
                ) : null}
            </Box>
            <Box className='logo' w='100%' pl='40%' pt='.6vh'>
                <span>PicStir</span>
            </Box>
            <Box w='100%' pt='.8vh'>
                {currentUser ? (
                    <Link
                        onClick={() => {
                            history.push('/messages');
                        }}
                    >
                        <BsFillChatFill style={{ marginTop: '5px' }} />
                    </Link>
                ) : null}
            </Box>
            <Box w='100%' pt='.8vh'>
                {currentUser ? (
                    <Link
                        ml='2rem'
                        onClick={() => {
                            removeCurrentUser();
                            history.push('/join');
                        }}
                    >
                        Logout
                    </Link>
                ) : (
                    <Link
                        ml='10rem'
                        onClick={() => {
                            history.push('/join');
                        }}
                    >
                        Login
                    </Link>
                )}
            </Box>
        </Grid>
    </Box>
);

const mapDispatchToProps = dispatch => {
    return {
        removeCurrentUser: () => {
            dispatch(removeCurrentUser());
        },
    };
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
