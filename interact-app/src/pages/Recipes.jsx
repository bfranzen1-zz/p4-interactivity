import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipesList } from './RecipesList';

class Recipes extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
    }

    deleteRecipe(key) {
        let recipeRef = firebase.database().ref('recipes/' + key)
        recipeRef.remove();
    }

    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
        this.requestRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            this.setState({ recipes: recipes });
        });
    }

    render() {
        let recipeArray = [];
        if (this.state.recipes) {
            let recipeKeys = Object.keys(this.state.recipes);
            recipeArray = recipeKeys.map((key) => {
                let recipe = this.state.recipes[key];
                recipe.key = key;
                return recipe;
            });
        }
        return (
            <div>
                <h1>Recipes Page</h1>
                <RecipesList deleteRecipe={(key) => this.props.deleteRecipe(key)} recipeArray={recipeArray} />
            </div>
        )
    }
}

export default Recipes