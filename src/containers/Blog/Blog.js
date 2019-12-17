import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

import './Blog.css';

class Blog extends Component {
    state = {
        auth: false
    }

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName='my-active' //inaczej nadawałoby domyślnie klasę active
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                <Switch>
                    {/*dodajemy dwa Routy do switcha żeby react mógł wybrać jeden i nie mylił ścieżki*/}
            {/*Guards - warunkujemy wyrenderowanie Routa z linkiem nowego posta. ALTERNATYWA: w newPost w metodzie*/}
            {/*componentDidMount sprawdzamy, czy user jest uprawniony za pomocą history.replace("/strona po przekierowaniu")*/}
                    {this.state.auth ? <Route path="/new-post" component={NewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;