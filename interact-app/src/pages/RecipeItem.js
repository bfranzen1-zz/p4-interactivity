import React, { Component } from 'react';
import '../index.css';
import firebase from 'firebase';
//var FontAwesome = require('react-font-awesome');
import 'font-awesome/css/font-awesome.min.css';

class RecipeItem extends Component {
    constructor() {
        super();
        this.state = {
            home: true,
            profile: false,
            likeable: true
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
        if (this.state.likeable) {
            this.setState({ likeable: false });
            let recipeRef = firebase.database().ref('recipes/' + this.props.recipe.key + '/likes');
            recipeRef.transaction(function (currentClicks) {
                return (currentClicks || 0) + 1;
            });
        }
    }

    render() {
        console.log(this.props.disabled);
        return (
            <div className="card" style={{ width: 18 + "rem" }}>
                <div className="card-header bg-info">
                    <div className="card-title-header">
                        <div>
                            <h5 className="card-title">{this.props.recipe.creator + "'s " + this.props.recipe.name}</h5>{'    '}
                        </div>
                        <div>
                            {!this.props.disabled &&
                                <i onClick={() => this.likeRecipe()} id="like" className={this.state.likeable ? "fa fa-heart" : "fa fa-heart clicked"}></i>
                            }
                        </div>
                    </div>
                    <ul className="nav nav-tabs card-header-tabs pull-right" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className={this.state.home ? "nav-link active" : "nav-link"} id="home-tab" name="home" data-toggle="tab" role="tab" aria-controls="home" aria-selected="true" onClick={(event) => {
                                this.changePanel(event.target.name);
                            }}> Home</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.state.profile ? "nav-link active" : "nav-link"} id="profile-tab" name="profile" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="false" onClick={(event) => {
                                this.changePanel(event.target.name);
                            }}>Profile</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={() => this.props.select(this.props.recipe)} className="nav-link" id="contact-tab" data-toggle="tab" href="#recipe" role="tab" aria-controls="contact" aria-selected="false">Recipe</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content" id="myTabContent">
                        <HomeTab recipe={this.props.recipe} />
                    </div>
                </div>
            </div>
        )
    }
}

class HomeTab extends Component {
    render() {
        return (
            <div>
                <img className="card-img-top" src={this.props.recipe.imgLink} alt="Card image" />
                <p> Likes: {this.props.recipe.likes}</p>
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