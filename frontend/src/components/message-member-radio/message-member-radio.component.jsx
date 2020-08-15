/** @format */

import React from 'react';

import { Button, Stack, Avatar, Text } from '@chakra-ui/core';

const MessageMemberRadioComponent = React.forwardRef((props, ref) => {
    const { isChecked, isDisabled, value, nameOfUser, username, imageUrl, ...rest } = props;

    return (
        <Stack isInline maxHeight='11vh' bg={isChecked ? '#eee' : '#fff'} spacing={6} p={3} rounded>
            <Button
                mt={2}
                ref={ref}
                bg={isChecked ? '#eee' : '#fff'}
                aria-checked={isChecked}
                role='radio'
                isDisabled={isDisabled}
                color={isChecked ? '#16a0e0' : '#000'}
                {...rest}
            >
                Select
            </Button>
            <Avatar mt={1} name={nameOfUser} src={imageUrl} />
            <Stack>
                <Text size='sm' maxHeight='2vh' textTransform='capitalize'>{nameOfUser}</Text>
                <Text size='xs' color='#bbb'>@{username}</Text>
            </Stack>
        </Stack>
    );
});

export default MessageMemberRadioComponent;
