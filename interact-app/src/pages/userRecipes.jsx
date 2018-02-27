import React, { Component } from 'react';
import firebase from 'firebase';

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
        console.log(this);
        this.setState({
            isHidden: !this.state.isHidden,
            creating: !this.state.creating
        });
    }

    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
        this.requestRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            this.setState({ recipes: recipes });
        });
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
            steps: this.state.steps
        };
        this.toggleHidden();
        this.requestRef.push(recipe);
    }

    render() {
        return (
            <div>
                <h1>My Recipes Page</h1>
                <div>
                    <button onClick={() => this.toggleHidden()} className={this.state.creating ? "btn btn-warning" : "btn btn-primary"}>{this.state.creating ? "Cancel" : "Create New Recipe"}</button>
                    {!this.state.isHidden && <RecipeForm addRecipe={() => this.addRecipe()} updateForm={(event) => this.updateForm(event)} />}
                </div>
            </div>
        )
    }
}
export default UserRecipes

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

