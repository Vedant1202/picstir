/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';

import { Button, Input, Image } from '@chakra-ui/core';

import { apiUrl } from '../../util/util';

class NewPostFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            fileUrl: null,
            file: null,
        };
    }

    showPreview = event => {
        this.setState({
            ...this.state,
            fileUrl: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
        });
    };

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    };

    uploadFile = event => {
        event.preventDefault();

        const data = new FormData();

        data.append('bio', this.state.bio.trim());
        data.append('postedBy', this.props.currentUser.user.id);
        data.append('postImage', this.state.file);

        const token = 'Bearer ' + this.props.currentUser.tokens.access.token;
        console.log(token);
        fetch(apiUrl + '/posts', {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: data,
        }).then(
            function(res) {
                if (res.ok) {
                    // Do nothing
                }
            },
            function(e) {
                alert('Error submitting form!');
                console.log(e);
            }
        );
    };

    render() {
        return (
            <>
                <Image src={this.state.fileUrl} id='upload-preview' />
                <Input type='file' id='post-upload' onChange={this.showPreview} />
                <Input placeholder='Enter Bio' id='bio' name='bio' onChange={this.handleChange} />
                <Button variantColor='blue' onClick={this.uploadFile}>
                    Post
                </Button>
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(NewPostFormComponent);
