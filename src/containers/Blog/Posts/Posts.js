import React, {Component} from 'react';
import axios from "../../../axios";
import './Posts.module.css';
import {Link} from 'react-router-dom';

import Post from '../../../components/Post/Post';

class Posts extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        // error: false
    }

    componentDidMount() {
        axios.get("/posts")
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Sawyer'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log(response);
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render() {
        const posts = this.state.posts.map(post => {
            return (
                //Sprawiamy, żeby po kliknięciu w pojedynczy post otworzył nam się cały. Reszta w Blog i FullPost.
                <Link to={'/' + post.id} key={post.id}>
                    <Post
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}/>
                </Link>
            );
        });
        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}

export default Posts;