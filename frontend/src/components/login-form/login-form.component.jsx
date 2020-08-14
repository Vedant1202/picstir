/** @format */

import React from 'react';
import { FormControl, FormLabel, Button, Input } from '@chakra-ui/core';

import { connect } from 'react-redux';

import PasswordInput from '../password-input/password-input.component';
import { auth } from '../../auth';
import { setCurrentUser } from '../../redux/user/user.actions';

class LoginFormComponent extends React.Component {
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;
        const { setCurrentUser } = this.props;

        try {
            const response = await auth.login(email, password);
            if (!response.success) {
                alert(response.data.message);
            } else {
                setCurrentUser(response.data);
                this.setState({
                    email: '',
                    password: '',
                });
                alert('Login Successful');
            }
        } catch (error) {
            console.log('Error: ' + error.message);
            alert(error.message);
            throw error;
        }
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <FormControl>
                <FormLabel htmlFor='email'> Email address </FormLabel>
                <Input type='email' id='email' name='email' onChange={this.handleChange} />
                <FormLabel htmlFor='name'> Password </FormLabel>
                <PasswordInput id='password' name='password' onChange={this.handleChange}></PasswordInput>
                <Button mt='2rem' variantColor='teal' onClick={this.handleSubmit}>
                    Login
                </Button>
            </FormControl>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginFormComponent);
