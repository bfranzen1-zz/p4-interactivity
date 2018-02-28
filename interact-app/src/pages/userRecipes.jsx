import React, { Component } from 'react';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAgY689SEezlkqbhYGGE7EomU4DAE5Gjbo",
    authDomain: "interactive-app-5ca2d.firebaseapp.com",
    databaseURL: "https://interactive-app-5ca2d.firebaseio.com",
    projectId: "interactive-app-5ca2d",
    storageBucket: "interactive-app-5ca2d.appspot.com",
    messagingSenderId: "285423782464"
};
firebase.initializeApp(config);

class UserRecipes extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            creating: false,
            recipes: [],
            name: '',
            imgLink: '',
            ingredients: '',
            steps: ''
        };
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            creating: !this.state.creating
        });
    }

    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
    }

    updateForm(event) {
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

    addRecipe() {
        let recipe = {
            name: this.state.name,
            imgLink: this.state.imgLink,
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            user: this.props.user.uid
        };
        this.toggleHidden();
        this.requestRef.push(recipe);
    }

    render() {
        let recipeKeys = Object.keys(this.state.recipes);
        let recipeArray = recipeKeys.map((key) => {
            let recipe = this.state.recipes[key];
            recipe.key = key;
            return recipe;
        }).filter((d) => {
            console.log(firebase.auth().currentUser.displayName);
            return d.user === firebase.auth().currentUser.uid;
        });
        console.log(recipeArray);
        return (
            <div>
                <h1>My Recipes Page</h1>
                <div>
                    <button onClick={() => this.toggleHidden()} className={this.state.creating ? "btn btn-warning" : "btn btn-primary"}>{this.state.creating ? "Cancel" : "Create New Recipe"}</button>
                    {!this.state.isHidden && <RecipeForm addRecipe={() => this.addRecipe()} updateForm={(event) => this.updateForm(event)} />}
                    {recipeArray.map((d, i) => {
                        return <div key={'link-' + i}>
                                    {d.name}
                                </div>
                    })}
                </div>
            </div>
        )
    }
}

class RecipeForm extends Component {
    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="reicpeName">Recipe Name:</label>
                    <input type="text" className="form-control" id="recipeName" name="name" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="img">Image URL:</label>
                    <input type="url" className="form-control" id="img" name="image" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients List:</label>
                    <textarea id="ingredients" className="form-control" name="ingredients" onChange={(event) => { this.props.updateForm(event) }}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Recipe steps:</label>
                    <textarea id="steps" className="form-control" name="steps" onChange={(event) => { this.props.updateForm(event) }}></textarea>
                </div>
                <button className="btn btn-primary" onClick={() => this.props.addRecipe()}>Post Your Recipe!</button>
            </div>
        )
    }
}

export default UserRecipes