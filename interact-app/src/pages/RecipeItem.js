import React, { Component } from 'react';
import '../index.css';
import firebase from 'firebase';
var FontAwesome = require('react-fontawesome');

class RecipeItem extends Component {
    constructor() {
        super();
        this.state = {
            about: true,
            info: false
        };
    }

    changePanel(panel) {
        let change = this.state;
        Object.keys(change).forEach((v) => {
            change[v] = false;
        });
        change[panel] = true;
        this.setState(change);
    }

    likeRecipe() {
        let recipeRef = firebase.database().ref('recipes/' + this.props.recipe.key + '/likes');
        recipeRef.transaction(function (currentClicks) {
            return (currentClicks || 0) + 1;
        });
    }

    render() {
        return (
            <div className="card" style={{ width: 18 + "rem" }}>
                <div className="card-header bg-info">
                    <div className="card-title-header">
                        <div>
                            <h5 className="card-title">{this.props.recipe.creator + "'s " + this.props.recipe.name}</h5>{'    '}
                        </div>
                        <div>
                            <FontAwesome onClick={() => this.likeRecipe()}  className='super' name='heart' size='lg' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
                        </div>
                    </div>
                    <ul className="nav nav-tabs card-header-tabs pull-right" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className={this.state.about ? "nav-link active" : "nav-link"} id="home-tab" name="about" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onClick={(event) => {
                                this.changePanel(event.target.name);
                            }}> About</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.info ? "nav-link active" : "nav-link"} id="profile-tab" name="info" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false" onClick={(event) => {
                                this.changePanel(event.target.name);
                            }}>Info</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => this.props.select(this.props.recipe)} className="nav-link" id="contact-tab" data-toggle="tab" href="#recipe" role="tab" aria-controls="contact" aria-selected="false">Recipe</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        {this.state.about && <AboutTab recipe={this.props.recipe} />}
                        {this.state.info && <InfoTab recipe={this.props.recipe} />}
                    </div>
                </div>
                <div className="delete-button">
                    {this.props.userRecipe && <button className="btn btn-outline-danger btn-sm" onClick={() => this.props.deleteRecipe(this.props.recipe.key)}>Delete Recipe</button>}
                </div>
            </div>
        )
    }
}

class AboutTab extends Component {
    render() {
        let date = new Date(this.props.recipe.time);
        return (
            <div className="info-tab">
                <img className="card-img-top" src={this.props.recipe.imgLink} alt="Card image" />
                <div>
                <p className="info-text"> Likes: {this.props.recipe.likes}</p>
                <p className="info-text"> Posted at: {date.toDateString()}</p>
                </div>
            </div>

        )
    }
}

class InfoTab extends Component {
    render() {
        return (
            <div className="info-tab">
                <img className="card-img-top" src={this.props.recipe.imgLink} alt="Card image" />
                <p className="info-text">{"Number of Ingredients: " + this.props.recipe.ingredients.length}</p>
                <p className="info-text">{"Number of Steps: " + this.props.recipe.steps.length}</p>
            </div>
        )
    }
}
{/* <img classNameName="card-img-top" src={this.props.recipe.imgLink} alt={this.props.recipe.name + " visual"} /> */ }
{/* <h5 classNameName="card-title">{this.props.recipe.name}</h5>
    <p classNameName="card-text">{this.props.recipe.ingredients}</p>
    <p classNameName="card-text">{this.props.recipe.steps}</p>
    <a onClick={() => this.props.deleteRecipe(this.props.recipe.key)} classNameName="btn btn-primary">Delete Recipe</a> */}

export { RecipeItem };