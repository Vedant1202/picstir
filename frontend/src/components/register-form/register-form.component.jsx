/** @format */

import React from 'react';
import { FormControl, FormLabel, Button, Input, Stack, Avatar } from '@chakra-ui/core';

import { connect } from 'react-redux';

import PasswordInput from '../password-input/password-input.component';
import { auth } from '../../auth';

import { setCurrentUser } from '../../redux/user/user.actions';
import { withRouter } from 'react-router-dom';

class RegisterFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            username: '',
            file: '',
            imageUrl: '',
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password, name, username, file } = this.state;

        try {
            const response = await auth.register(email, password, name, username, file);
            if (!response.success) {
                alert(response.message);
            } else {
                setCurrentUser(response.data);
                this.setState({
                    email: '',
                    password: '',
                    name: '',
                    username: '',
                    file: '',
                    imageUrl: '',
                });
                alert('Registration Successful! Login to continue');
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

    showPreview = event => {
        this.setState(
            {
                ...this.state,
                imageUrl: URL.createObjectURL(event.target.files[0]),
                file: event.target.files[0],
            },
            () => {
                console.log(this.state);
            }
        );
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
                    <FormLabel mt={3} htmlFor='profile-upload'>
                        {' '}
                        Profile Picture{' '}
                    </FormLabel>
                    <Stack isInline>
                        <Input type='file' w='70%' id='profile-upload' onChange={this.showPreview} />
                        <Avatar size='2xl' marginLeft={3} name={this.state.name} src={this.state.imageUrl} />
                    </Stack>
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

export default withRouter(connect(null, mapDispatchToProps)(RegisterFormComponent));
