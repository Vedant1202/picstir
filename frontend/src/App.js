/** @format */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import LoginRegisterPage from './pages/login-register/login-register.page';
import { getData, checkData } from './util/util';
import ErrorPage from './pages/errorpage/errorpage.component';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import MessagesPageComponent from './pages/messages-page/messages-page.component';

class App extends React.Component {
    componentDidMount() {
        if (checkData('user')) {
            setCurrentUser({ ...getData('user') });
        }
    }

    render() {
        return (
            <ThemeProvider>
                <CSSReset />
                <div className='App'>
                    <Header></Header>
                    <Switch>
                        <Route
                            exact
                            path='/home'
                            render={() =>
                                this.props.currentUser ? <Homepage></Homepage> : <Redirect to='/join'></Redirect>
                            }
                        ></Route>
                        <Route
                            exact
                            path='/join'
                            render={() =>
                                this.props.currentUser ? (
                                    <Redirect to='/home'></Redirect>
                                ) : (
                                    <LoginRegisterPage></LoginRegisterPage>
                                )
                            }
                        ></Route>
                        <Route
                            exact
                            path='/messages'
                            render={() =>
                                this.props.currentUser ? (
                                    <MessagesPageComponent></MessagesPageComponent>
                                ) : (
                                    <Redirect to='/home'></Redirect>
                                )
                            }
                        ></Route>
                        <Route
                            path='*'
                            render={() =>
                                this.props.currentUser ? <ErrorPage></ErrorPage> : <Redirect to='/join'></Redirect>
                            }
                        ></Route>
                    </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: user => {
            dispatch(setCurrentUser(user));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
