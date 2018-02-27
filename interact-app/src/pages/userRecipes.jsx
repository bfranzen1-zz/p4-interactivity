import React, { Component } from 'react';

class userRecipes extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            creating: false
        };
    }

    toggleHidden() {
        console.log(this);
        this.setState({
            isHidden: !this.state.isHidden,
            creating: !this.state.creating
        });
    }

    render() {
        return (
            <div>
                <h1>My Recipes Page</h1>
                <div>
                    <button onClick={() => this.toggleHidden()} className={this.state.creating ? "btn btn-warning" : "btn btn-primary"}>{this.state.creating ? "Cancel" : "Create New Recipe"}</button>
                    {!this.state.isHidden && <RecipeForm />}
                </div>
            </div>
        )
    }
}
export default userRecipes

class RecipeForm extends Component {
    render() {
        return (
            <form action="/my-handling-form-page" method="post">
                <div className="form-group">
                    <label htmlFor="reicpeName">Recipe Name:</label>
                    <input type="text" className="form-control" id="recipeName" name="recipe_name" />
                </div>
                <div className="form-group">
                    <label htmlFor="img">Image URL:</label>
                    <input type="url" className="form-control" id="img" name="recipe_image"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients List:</label>
                    <textarea id="ingredients" className="form-control" name="recipe_ingredients"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Recipe steps:</label>
                    <textarea id="steps" className="form-control" name="recipe_steps"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Post Your Recipe!</button>
            </form>
        )
    }
}