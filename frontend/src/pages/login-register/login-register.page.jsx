/** @format */

import React from 'react';

import './login-register.styles.scss';

import { Text, Stack, SimpleGrid, Box } from '@chakra-ui/core';
import LoginFormComponent from '../../components/login-form/login-form.component';
import RegisterFormComponent from '../../components/register-form/register-form.component';

const LoginRegisterPage = () => (
    <div className='login-register'>
        <Stack spacing={8} pt='4rem' p='2rem' rounded='1rem' bg='rgba(255, 255, 255, 0.8)'>
            <SimpleGrid columns={2} spacing={2}>
                <Box pr='4.5rem'>
                    <Text fontSize='4xl' mb='2rem'>
                        Login
                    </Text>
                    <LoginFormComponent></LoginFormComponent>
                </Box>
                <Box>
                    <Text fontSize='4xl' mb='2rem'>
                        New User? Register
                    </Text>
                    <RegisterFormComponent></RegisterFormComponent>
                </Box>
            </SimpleGrid>
        </Stack>
    </div>
);

export default LoginRegisterPage;
