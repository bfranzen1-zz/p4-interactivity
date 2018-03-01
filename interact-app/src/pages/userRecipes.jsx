import React, { Component } from 'react';
import firebase from 'firebase';
import { RecipesList } from './RecipesList';

class UserRecipes extends Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
            creating: false,
            recipes: [],
            name: '',
            imgLink: '',
            ingredients: [],
            steps: []
        };
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden,
            creating: !this.state.creating
        });
    }

    componentDidMount() {
        this.requestRef = firebase.database().ref('recipes');
        this.requestRef.on('value', (snapshot) => {
            let recipes = snapshot.val();
            this.setState({ recipes: recipes });
        });
    }

    updateForm(event) {
        let val = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = val;
        this.setState(change);
    }

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

    removeItem(type) {
        type === "Ingredient" ?
            this.state.ingredients.pop() :
            this.state.steps.pop();
    }

    addRecipe() {
        let recipe = {
            name: this.state.name,
            imgLink: this.state.imgLink,
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            user: this.props.user.uid
        };
        this.toggleHidden();
        this.requestRef.push(recipe);
    }

    deleteRecipe(key) {
        let recipeRef = firebase.database().ref('recipes/' + key)
        recipeRef.remove();
    }

    render() {
        let recipeArray = [];
        if (this.state.recipes) {
            let recipeKeys = Object.keys(this.state.recipes);
            recipeArray = recipeKeys.map((key) => {
                let recipe = this.state.recipes[key];
                recipe.key = key;
                return recipe;
            }).filter((d) => {
                return d.user === firebase.auth().currentUser.uid;
            });
        }
        return (
            <div>
                <h1>Welcome, {this.props.user.displayName}!</h1>
                <p className="info">Look at the recipes you've made, click on them to see likes, comments and
                    other data! Create new Recipes here too.
                </p>
                <div>
                    <button onClick={() => this.toggleHidden()} className={this.state.creating ? "btn btn-warning" : "btn btn-primary"}>
                        {this.state.creating ? "Cancel" : "Create New Recipe"}
                    </button>
                    {!this.state.isHidden && <RecipeForm updateList={(event, type) => this.updateList(type, event)}
                        addRecipe={() => this.addRecipe()} updateForm={(event) => this.updateForm(event)}
                        remove={(type) => this.removeItem(type)} />}
                    {recipeArray.map((d, i) => {
                        return <div key={'link-' + i}>
                            {d.name}
                        </div>
                    })}
                    <RecipesList deleteRecipe={(key) => this.deleteRecipe(key)} recipeArray={recipeArray} />
                </div>
            </div>
        )
    }
}

class RecipeForm extends Component {
    render() {
        return (
            <div id="RecipeForm" className="center-block">
                <div className="form-group">
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input type="text" className="form-control" id="recipeName" name="name" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="recipeName">Image Url:</label>
                    <input type="text" className="form-control" id="recipeName" name="imgLink" onChange={(event) => { this.props.updateForm(event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients List:</label>
                    <List type="Ingredient" removeItem={(type) => this.props.remove(type)} update={(event, type) => { this.props.updateList(type, event) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="steps">Recipe steps:</label>
                    <List type="Step" removeItem={(type) => this.props.remove(type)} update={(event, type) => { this.props.updateList(type, event) }} />
                </div>
                <button className="btn btn-primary" onClick={() => this.props.addRecipe()}>Post Your Recipe!</button>
            </div>
        )
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }

    add() {
        this.setState({
            count: this.state.count + 1
        })
    }

    delete() {
        this.props.removeItem(this.props.type);
        this.setState({
            count: this.state.count === 0 ? 0 : this.state.count - 1
        })
    }

    render() {
        let inputs = [];
        for (let i = 1; i <= this.state.count; i++) {
            inputs.push(<div className="ListItem" key={i}>
                <span key={i}>{i + "."}</span>
                <input onChange={(event) => this.props.update(this.props.type, event)} key={"item" + i} type="text" className="form-control" name={this.props.type + i} />
            </div>);
        }
        return (
            <div>
                {inputs}
                <button id="AddButton" type="button" className="btn btn-primary btn-sm" onClick={() => this.add()}>
                    +
                </button>
                <button id="AddButton" type="button" className="btn btn-danger btn-sm" onClick={() => this.delete()}>
                    -
                </button>
            </div>);
    }
}

export default UserRecipes