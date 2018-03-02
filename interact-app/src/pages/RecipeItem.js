import React, { Component } from 'react';

class RecipeItem extends Component {
    render() {
        return (
            <div className="card" style={{ width: 18 + 'rem' }}>
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link" href="#test">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
                {/* <img className="card-img-top" src={this.props.recipe.imgLink} alt={this.props.recipe.name + " visual"} /> */}
                <div id='test' className="card-body">
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