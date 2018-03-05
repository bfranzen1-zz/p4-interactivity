import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipesList } from './RecipesList';

//class that handles/displays recipes that the 
//current user has created
class UserRecipes extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            creating: false,
            recipes: [],
            name: '',
            imgLink: '',
            creator: '',
            category: '',
            ingredients: [],
            steps: []
        };
    }

    //toggles whether recipe form should be hidden
    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            creating: !this.state.creating
        });
    }
    //on component mount reference to recipes object
    //in firebase created and recipes state is set to that object
    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
        this.requestRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            this.setState({ recipes: recipes });
        });
    }

    //sets state of field that is passed from the event
    //to the passed value
    updateForm(event) {
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

    //updates the state of type of list (ingredient || step) based
    //on value passed from event.
    updateList(type, event) {
        let val = event.target.value;
        let num = event.target.name.slice(-1);
        if (type === "Ingredient") {
            let array = this.state.ingredients;
            array[num - 1] = val;
            this.setState({ ingredients: array });
        } else {
            let array = this.state.steps;
            array[num - 1] = val;
            this.setState({ steps: array });
        }
    }

    //removes input element from recipe form based on 
    //list type (ingredient || step)
    removeItem(type) {
        type === "Ingredient" ?
            this.state.ingredients.pop() :
            this.state.steps.pop();
    }

    //adds recipe to firebase,
    //all recipe form information passed
    addRecipe() {
        let recipe = {
            name: this.state.name,
            imgLink: this.state.imgLink,
            creator: this.props.user.displayName,
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            user: this.props.user.uid,
            likes: 0,
            time: firebase.database.ServerValue.TIMESTAMP
        };
        this.toggleHidden();
        this.requestRef.push(recipe);
    }

    //deletes the recipe from firebase and therefore react app
    deleteRecipe(key) {
        let recipeRef = firebase.database().ref('recipes/' + key)
        recipeRef.remove();
    }

    //renders content needed to display user recipes and gives them the ability
    //to upload new recipes
    render() {
        let isUserRecipe = true;
        let recipeArray = [];
        if (this.state.recipes) { //if there are any recipes
            let recipeKeys = Object.keys(this.state.recipes);
            recipeArray = recipeKeys.map((key) => {
                let recipe = this.state.recipes[key];
                recipe.key = key;
                return recipe;
            }).filter((d) => { //only returns recipes made by current user
                return d.user === firebase.auth().currentUser.uid;
            });
        }
        return (
            <div>
                <h1>Welcome, {this.props.user.displayName}!</h1>
                <p className="info">Look at the recipes you've made, click on them to see likes, comments and
                    other information! Create new Recipes here too.
                </p>
                <div id="recipeForm">
                    <button id="makeRecipe" onClick={() => this.toggleHidden()} className={this.state.creating ? "btn btn-warning" : "btn btn-primary"}>
                        {this.state.creating ? "Cancel" : "Create New Recipe"}
                    </button>
                    {!this.state.isHidden && <RecipeForm updateList={(event, type) => this.updateList(type, event)}
                        addRecipe={() => this.addRecipe()} updateForm={(event) => this.updateForm(event)}
                        remove={(type) => this.removeItem(type)}
                        updateCategory={(event) => this.updateCategory(event)} />}
                </div>
                <RecipesList disabled="true" select={(recipe) => this.props.select(recipe)} userRecipe={isUserRecipe} deleteRecipe={(key) => this.deleteRecipe(key)} recipeArray={recipeArray} />
            </div>
        )
    }
}

//class that handles/shows the form that users can fill out to 
//upload a recipe. Only shown if user has clicked "create a new recipe"
class RecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true
        }
    }

    //checks if the user has filled out the entire form,
    //displays error if they haven't and won't let them upload it
    checkValid() {
        let form = document.querySelectorAll("#RecipeForm input");
        let array = Object.keys(form).map((d) => {
            if (form[d].value.length < 1) {
                return false;
            }
        })
        let valid = !Object.values(array).includes(false);
        if (!valid) {
            this.setState({ isValid: false });
        } else {
            this.props.addRecipe();
        }
    }

    //renders recipe form 
    render() {
        return (
            <div id="RecipeForm" className="center-block">
                {!this.state.isValid &&
                    <p className="alert alert-danger">Please fill out the entire form!</p>}
                <div className="form-group">
                    <input placeholder="Recipe Name" type="text" className="form-control" id="recipeName" name="name" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <input placeholder="Image Url of Food" type="text" className="form-control" id="img" name="imgLink" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients List:</label>
                    <List type="Ingredient" removeItem={(type) => this.props.remove(type)} update={(event, type) => { this.props.updateList(type, event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Recipe steps:</label>
                    <List type="Step" removeItem={(type) => this.props.remove(type)} update={(event, type) => { this.props.updateList(type, event) }} />
                </div>
                <button className="btn btn-primary" onClick={() => this.checkValid()}>Post Your Recipe!</button>
            </div>
        )
    }
}

//class that lets user fill out a list
//of input elements. They can add or delete an input
//box to make the list bigger/smaller
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    //increases input box count by 1
    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

    //decreases input box count by 1
    delete() {
        this.props.removeItem(this.props.type);
        this.setState({
            count: this.state.count === 0 ? 0 : this.state.count - 1
        })
    }

    //renders the list based on count state 
    render() {
        let inputs = [];
        //generates input box based on state count
        for (let i = 1; i <= this.state.count; i++) {
            inputs.push(<div className="ListItem" key={i}>
                <input placeholder={i + "."} onChange={(event) => this.props.update(this.props.type, event)} key={"item" + i} type="text" className="form-control" name={this.props.type + i} />
            </div>);
        }
        return (
            <div className="List">
                {inputs}
                <button id="addBtn" type="button" className="btn btn-primary btn-sm " onClick={() => this.add()}>
                    +
                </button>
                <button id="delBtn" type="button" className="btn btn-danger btn-sm" onClick={() => this.delete()}>
                    -
                </button>
            </div>);
    }
}

export default UserRecipes