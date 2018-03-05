import React, { Component } from 'react';
import '../index.css';
import firebase from 'firebase';
import 'font-awesome/css/font-awesome.min.css';

//class that handles/shows a recipe bootstrap card
class RecipeItem extends Component {
    constructor() {
        super();
        this.state = {
            about: true,
            info: false,
            likeable: true
        };
    }

    changePanel(panel) {
        if(panel === 'about') {
            this.setState({
                about: true,
                info: false
            });
        } else {
            this.setState({
                about:false,
                info: true
            });
        }
    }

    //function that handles when a user clicks the heart icon 
    //on a recipe card
    likeRecipe() {
        if (this.state.likeable) {
            this.setState({ likeable: false });
            let recipeRef = firebase.database().ref('recipes/' + this.props.recipe.key + '/likes');
            recipeRef.transaction(function (currentClicks) {
                return (currentClicks || 0) + 1;
            });
        }
    }

    //renders bootstrap card with information about that recipe,
    //card has navigation that displays different information
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
export { RecipeItem };