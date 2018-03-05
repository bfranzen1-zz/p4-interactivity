import React, { Component } from 'react';
import { RecipeItem } from './RecipeItem';

//class that handles/shows list of recipes 
class RecipesList extends Component {
    //renders card deck that contains recipe cards
    render() {
        return (
            <div className="card-deck">
                {this.props.recipeArray.map((d, i) => {
                    return <div key={'link-' + i}>
                        <RecipeItem disabled={this.props.disabled} userRecipe={this.props.userRecipe} select={(recipe) => this.props.select(recipe)} deleteRecipe={(key) => this.props.deleteRecipe(key)} recipe={d} />
                        
                    </div>
                })}
            </div>
        )
    }
}

export { RecipesList };