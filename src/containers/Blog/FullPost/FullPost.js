import React, {Component} from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    //zmieniamy componentDidUpdate na mount bo już nie updatujemy full post. match.params to elementy obiektu, który otrzymujemy
    //po załadowaniu strony (patrz console) a propsem jest tutaj właśnie ten obiekt z bazy danych.
    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

//zmianiamy ponownie na componentDidUpdate bo dodaliśmy Route i musimy updatować posta gdy zmieniamy dynamicznie id posta w linku
    //inaczej, dajemy didUpdate bo props (przekazywany obiekt) się zmienia
    componentDidUpdate() {
        this.loadData();
    }

    loadData () {
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.match.params.id)) {
            //POWYŻEJ - loadedpost jest liczbą, a params.id stringiem, więc albo usuwamy jeden znak rózności, żeby nie sprawdzać
            // także czy typ jest identyczny, albo przed this.props.match.params.id dać plusa, żeby sparsować id na liczbę.
                axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        this.setState({loadedPost: response.data});
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;