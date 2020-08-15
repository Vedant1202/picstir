/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';
import { postController } from '../../controller';

import NewPostComponent from '../new-post/new-post.component';

import './home-feed.styles.scss';
import Post from '../post/post.component';

class HomeFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    async componentDidMount() {
        const token = 'Bearer ' + this.props.currentUser.tokens.access.token;
        const response = await postController.fetchPosts(token);

        console.log(response.success);
        if (!response.success) {
            alert('There was some error');
        } else {
            this.setState({
                posts: response.data.results,
            });
        }
    }

    render() {
        const posts = this.state.posts;

        return (
            <div className='home-feed'>
                <NewPostComponent></NewPostComponent>
                {posts.map(({ id, ...otherProps }) => {
                    return <Post key={id} postId={id} {...otherProps}></Post>;
                })}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(HomeFeed);
