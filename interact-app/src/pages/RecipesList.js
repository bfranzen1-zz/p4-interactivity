import React, { Component } from 'react';
import { RecipeItem } from './RecipeItem';


class RecipesList extends Component {
    render() {
        return (
            <div className="card-deck">
                {this.props.recipeArray.map((d, i) => {
                    return <div key={'link-' + i}>
                        <RecipeItem userRecipe={this.props.userRecipe} select={(recipe) => this.props.select(recipe)} deleteRecipe={(key) => this.props.deleteRecipe(key)} recipe={d} />
                    </div>
                })}
            </div>
        )
    }
}

export { RecipesList };