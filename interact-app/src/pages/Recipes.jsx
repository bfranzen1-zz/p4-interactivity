import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipesList } from './RecipesList';

//class that handles the explore page,
//displays all recipes created by all users
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

    //makes reference to firebase for recipes 
    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
        this.requestRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            this.setState({ recipes: recipes });
        });
    }

    //renders all recipe cards to be displayed
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
                <h1>User Recipes</h1>
                <RecipesList select={(recipe) => this.props.select(recipe)} deleteRecipe={(key) => this.props.deleteRecipe(key)} recipeArray={recipeArray} />
            </div>
        )
    }
}

export default Recipes