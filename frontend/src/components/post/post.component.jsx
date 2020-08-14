/** @format */

import React from 'react';

import { Box, Image, Flex, Text, Avatar } from '@chakra-ui/core';
import LikeButton from '../like-button/like-button.component';
import { getCurrentDate } from '../../util/util';

const Post = ({ imageUrl, bio, postId, updatedAt, likes, creator }) => {
    return (
        <Box mt='2rem' border='1px' borderRadius='md' borderColor='gray.200' p='1rem' pb='2rem'>
            <Image rounded='md' src={process.env.PUBLIC_URL + '/uploads/posts/' + imageUrl} />
            <Flex align='baseline' mt={4} mb={3}>
                <Avatar size='md' src='https://bit.ly/dan-abramov' />
                <Text ml={4} textTransform='capitalize' fontSize='md'>
                    {creator[0].name}
                </Text>
                <LikeButton likes={likes} postId={postId}></LikeButton>
            </Flex>
            <hr />
            <Text mt={2} fontSize='xl' fontWeight='semibold' lineHeight='short'>
                {bio}
            </Text>
            <Text color='#aaa'>
                {getCurrentDate(updatedAt, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
        </Box>
    );
};

export default Post;
