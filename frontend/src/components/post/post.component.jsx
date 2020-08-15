/** @format */

import React from 'react';

import { Box, Image, Text, Avatar, Stack } from '@chakra-ui/core';
import LikeButton from '../like-button/like-button.component';
import { getCurrentDate } from '../../util/util';

const Post = ({ imageUrl, bio, postId, updatedAt, likes, creator }) => {
    return (
        <Box mt='2rem' border='1px' borderRadius='md' borderColor='gray.200' p='1rem' pb='2rem'>
            <Image rounded='md' src={process.env.PUBLIC_URL + '/uploads/posts/' + imageUrl} />
            <Stack isInline mt={5} mb={2}>
                <Avatar
                    size='md'
                    name={creator[0].name}
                    src={process.env.PUBLIC_URL + '/uploads/profile/' + creator[0].imageUrl}
                />
                <Stack>
                    <Text ml={4} textTransform='capitalize' fontSize='md'>
                        {creator[0].name}
                    </Text>
                    <Text ml={4} textTransform='capitalize' fontSize='xs' color='#bbb'>
                        @({creator[0].username})
                    </Text>
                </Stack>
                <LikeButton likes={likes} postId={postId}></LikeButton>
            </Stack>
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
