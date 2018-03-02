import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipeItem } from './RecipeItem';


class RecipesList extends Component {
    render() {
        return (
            <div className="card-columns">
                {this.props.recipeArray.map((d, i) => {
                    return (
                        <RecipeItem key={i} deleteRecipe={(key) => this.props.deleteRecipe(key)} recipe={d} />)
                })}
            </div>
        )
    }
}

export { RecipesList };