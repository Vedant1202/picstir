/** @format */

import React from 'react';

import { Stack, Box, Text, Grid } from '@chakra-ui/core';
import { getCurrentDate } from '../../util/util';

const MessageComponent = ({ text, mine, createdAt }) => (
    <Box>
        <Stack mb={3}>
            {mine ? (
                <>
                    <Box>
                        <Grid templateColumns='70% 30%'>
                            <Box></Box>
                            <Text bg='#ededed' fontSize='md' p={4} shadow='sm'>
                                {text}
                            </Text>
                        </Grid>
                    </Box>
                    <Text fontSize='xs' as='i' color='#adadad' textAlign='right'>
                        {getCurrentDate(createdAt, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </Text>
                </>
            ) : (
                <>
                    <Box>
                        <Grid templateColumns='30% 70%'>
                            <Text bg='#ededed' fontSize='md' p={4} shadow='sm'>
                                {text}
                            </Text>
                            <Box></Box>
                        </Grid>
                    </Box>
                    <Text fontSize='xs' as='i' color='#adadad'>
                        12/08/2020 6:30pm
                    </Text>
                </>
            )}
        </Stack>
    </Box>
);

export default MessageComponent;
