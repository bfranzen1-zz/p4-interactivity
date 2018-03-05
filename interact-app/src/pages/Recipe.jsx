import React, { Component } from 'react';
import '../index.css';
import firebase from 'firebase';

//class that handles/shows what to display when a user clicks 
//on the recipe tab of a recipe bootstrap card
class Recipe extends Component {
    componentDidMount() {
        //scrolls to top of page after user clicks on recipe tab 
        window.scrollTo(0, 0);
    }

    //renders recipe information
    render() {
        if (Object.keys(this.props.recipe).length > 0) {
            return (
                <div>
                    <h1 className="recipe">{this.props.recipe.creator + "'s " + this.props.recipe.name}</h1>
                    <img className="recipe" src={this.props.recipe.imgLink} alt="Recipe" />
                    <h2 className="recipe">What you need:</h2>
                    <ul className="list-group align-items-center">
                        {this.props.recipe.ingredients.map((d, i) => {
                            return <li className="list-group-item list-group-item-info" key={d + i}>{d}</li>
                        })}
                    </ul>
                    <h2 className="recipe">How to make it!</h2>
                    <ul className="">
                        {this.props.recipe.steps.map((d, i) => {
                            return <li className="" key={d + i}>
                                {(i + 1) + ". " + d}
                            </li>
                        })}
                    </ul>
                    <h2 className="recipe">Comments</h2>
                    <CommentSection recipeRef={this.props.recipe.key} />
                </div>
            );
        } else {
            return (<p className="alert alert-warning"> No Recipe to Display!</p>)
        }
    }
}

//class that handles the commment section of each recipe page
class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: ""
        }
    }

    //gets comments from firebase that reference this recipe specifically
    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes/' + this.props.recipeRef + "/comments");
        this.requestRef.on('value', (snapshot) => {
            let comments = snapshot.val();
            this.setState({ comments: comments });
        });
        console.log(this.requestRef);
    }

    //updates state of comment being written 
    updateComment(event) {
        let val = event.target.value;
        this.setState({
            newComment: val
        });
    }

    //adds comment to firebase and therefore react app
    addComment() {
        let comment = {
            name: firebase.auth().currentUser.displayName,
            text: this.state.newComment,
            time: firebase.database.ServerValue.TIMESTAMP
        }
        this.requestRef.push(comment);
        this.setState({ newComment: "" });
    }

    //renders comments to display
    render() {
        return (
            <div>
                <Comments comments={this.state.comments} />
                <div className="form-group">
                    <textarea className="form-control"
                        name="username"
                        placeholder="Write a Comment"
                        onChange={(e) => this.updateComment(e)}
                    />
                </div>
                <button id="comment" className="btn btn-primary" onClick={() => this.addComment()}>Comment</button>
            </div>
        );
    }
}

//class that handles what information needs to be displayed about each comment
class Comments extends Component {
    render() {
        let comments = this.props.comments;
        return (
            <div>
                {comments && Object.keys(comments).map((d, i) => {
                    let date = new Date(comments[d].time);
                    return (
                        <div key={d + i} className="box">
                            <h3 className="box">{comments[d].name}</h3>
                            <h4 className="box">{"On " + date.toDateString() + " Said: "}</h4>
                            <p className="box">{comments[d].text}</p>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default Recipe;