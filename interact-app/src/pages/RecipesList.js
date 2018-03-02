import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipeItem } from './RecipeItem';


class RecipesList extends Component {
    render() {
        return (
            <div className="card-deck">
                {this.props.recipeArray.map((d, i) => {
                    return <div key={'link-' + i}>
                        <RecipeItem deleteRecipe={(key) => this.props.deleteRecipe(key)} recipe={d} />
                    </div>
                })}
            </div>
        )
    }
}

export { RecipesList };