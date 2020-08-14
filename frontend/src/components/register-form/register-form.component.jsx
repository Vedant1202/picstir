/** @format */

import React from 'react';
import { FormControl, FormLabel, Button, Input } from '@chakra-ui/core';

import { connect } from 'react-redux';

import PasswordInput from '../password-input/password-input.component';
import { auth } from '../../auth';

import { setCurrentUser } from '../../redux/user/user.actions';

class RegisterFormComponent extends React.Component {
    handleSubmit = async event => {
        event.preventDefault();

        const { email, password, name, username } = this.state;
        const { setCurrentUser } = this.props;

        try {
            const response = await auth.register(email, password, name, username);
            if (!response.success) {
                alert(response.data.message);
            } else {
                setCurrentUser(response.data);
                this.setState({
                    email: '',
                    password: '',
                    name: '',
                    username: '',
                });
                alert('Registration Successful');
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
            <div className='container'>
                <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input type='text' id='username' name='username' onChange={this.handleChange} />
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input type='text' id='name' name='name' onChange={this.handleChange} />
                    <FormLabel htmlFor='email'> Email address </FormLabel>
                    <Input type='email' id='email-register' name='email' onChange={this.handleChange} />
                    <FormLabel htmlFor='name'> Password </FormLabel>
                    <PasswordInput id='password-register' name='password' onChange={this.handleChange}></PasswordInput>
                    <Button mt='2rem' variantColor='teal' onClick={this.handleSubmit}>
                        Register
                    </Button>
                </FormControl>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(RegisterFormComponent);
