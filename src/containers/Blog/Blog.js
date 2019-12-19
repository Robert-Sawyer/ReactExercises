import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

//webpack interpretuje importy jako rzeczy niezbędne do załadowania podczas wyrenderowania strony nawet jesli nie są używane
//lazy loading (asyncComponent) sprawia, że te importy są ładowane dopiero gdy user chce ich użyć
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost'); //dynamiczny import ładuje elementy tylko gdy zostanie wywołany ten const (Route)
});

class Blog extends Component {
    state = {
        auth: true
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
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    {/*Alternatywny sposób do łapania błędu 404.*/}
                    {/*<Route render={() => <h1>Not found</h1>}/>*/}
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;

//Lazy loading / code spliting - ładowanie tylko tych elementów aplikacji, które sa uzywane,np jesli user
//przejdzie na jakas podstrone, ale dopuki tego nie zrobi wtedy ta strona nie jest wczytywana do pamueci przegladarki