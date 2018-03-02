import React, { Component } from 'react';

class RecipeItem extends Component {
    render() {
        return (
            <div className="card" style={{ width: 18 + 'rem' }}>
                <img className="card-img-top" src={this.props.recipe.imgLink} alt={this.props.recipe.name + " visual"} />
                <div className="card-body">
                    <h5 className="card-title">{this.props.recipe.name}</h5>
                    <p className="card-text">{this.props.recipe.ingredients}</p>
                    <p className="card-text">{this.props.recipe.steps}</p>
                    <a onClick={() => this.props.deleteRecipe(this.props.recipe.key)} className="btn btn-primary">Delete Recipe</a>
                </div>
            </div>
        )
    }
}

export { RecipeItem };