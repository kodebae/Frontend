import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addRecipe } from "../actions";
import ShowArrayItem from "./ShowArrayItem";

class RecipeForm extends React.Component {
  state = {
    title: "",
    source: "",
    ingredients: [],
    directions: [],
    tags: [],
    note: "",
    fullNote: [],
    ingredientValue: "",
    directionValue: "",
    tag: "",
    commonTags: [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Dessert",
      "Side",
      "Main",
      "Appetizer",
      "Vegetable",
      "Chicken",
      "Pork",
      "Beef",
      "Quick",
    ],
  };

  handleChanges = (e) => {
    e.persist();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  addIngredient = (e) => {
    e.preventDefault();
    this.setState((state) => {
      const ingredients = [...state.ingredients, state.ingredientValue];
      return {
        ingredients,
        ingredientValue: "",
      };
    });
  };

  addDirection = (e) => {
    e.preventDefault();
    this.setState((state) => {
      const directions = [...state.directions, state.directionValue];
      return {
        directions,
        directionValue: "",
      };
    });
  };

  addTagByButton = (e, tag) => {
    e.preventDefault();
    this.setState((state) => {
      const tags = [...state.tags, tag.toString()];
      const commonTags = state.commonTags.filter((el) => el !== tag);
      return {
        tags,
        commonTags,
      };
    });
  };
  addCustomTag = (e) => {
    e.preventDefault();
    const newTags = [...this.state.tags];
    newTags.push(this.state.tag);
    this.setState({
      tags: newTags,
      tag: "",
    });
  };
  addNote = (e) => {
    e.preventDefault();
    const newNote = this.state.fullNote;
    newNote.push(this.state.note);
    this.setState({
      fullNote: newNote,
      note: "",
    });
  };

  deleteIngredient = (e, index) => {
    e.preventDefault();
    const newIngredients = [...this.state.ingredients];
    newIngredients.splice(index, 1);
    this.setState({
      ingredients: newIngredients,
    });
  };
  deleteDirection = (e, index) => {
    e.preventDefault();
    const newDirections = [...this.state.directions];
    newDirections.splice(index, 1);
    this.setState({
      directions: newDirections,
    });
  };
  deleteTag = (e, index) => {
    e.preventDefault();
    const newTags = [...this.state.tags];
    newTags.splice(index, 1);
    this.setState({
      tags: newTags,
    });
  };

  deleteNote = (e, index) => {
    e.preventDefault();
    const newNote = [...this.state.fullNote];
    newNote.splice(index, 1);
    this.setState({
      fullNote: newNote,
    });
  };

  submitRecipe = (e) => {
    e.preventDefault();
    const fullNoteString = this.state.fullNote.join("||");
    const newRecipe = {
      title: this.state.title,
      source: this.state.source,
      ingredients: this.state.ingredients,
      instructions: this.state.directions,
      tags: this.state.tags,
      notes: fullNoteString,
    };
    console.log("submit recipe history", this.props.history);
    this.props.addRecipe(newRecipe, this.props.history);
  };

  render() {
    return (
      <div className='recipe-form'>
        <h2>Create New Recipe</h2>
        <form className='form-items' onSubmit={this.submitRecipe}>
          <input
            placeholder='Title'
            type='text'
            required
            name='title'
            onChange={this.handleChanges}
            value={this.state.title}
          />
          <input
            placeholder='Source'
            type='text'
            name='source'
            onChange={this.handleChanges}
            value={this.state.source}
          />
          <div className='ingredients-wrapper'>
            <h3>Ingredients</h3>

            <input
              placeholder='Ingredient'
              type='text'
              name='ingredientValue'
              onChange={this.handleChanges}
              value={this.state.ingredientValue}
            />
            <button onClick={this.addIngredient}>Add Ingredient</button>

            {this.state.ingredients.map((ingredient, index) => (
              <div className='ingredient'>
                <ShowArrayItem
                  listNum={index + 1}
                  item={ingredient}
                  key={index}
                />
                <button
                  className='del-ingred-btn'
                  onClick={(e) => this.deleteIngredient(e, index)}
                >
                  Delete Ingredient
                </button>
              </div>
            ))}
          </div>
          <div className='directions-wrapper'>
            <h3>Directions</h3>
            <input
              type='text'
              name='directionValue'
              onChange={this.handleChanges}
              value={this.state.directionValue}
              placeholder='Direction'
            />
            <button onClick={this.addDirection}>Add</button>
            {this.state.directions.map((direction, index) => (
              <div className='direction'>
                <ShowArrayItem
                  listNum={index + 1}
                  item={direction}
                  key={index}
                />
                <button
                  className='direction-btn'
                  onClick={(e) => this.deleteDirection(e, index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className='tags-wrapper'>
            <h3>Tags</h3>
            <div className='tags'>
              {this.state.commonTags.map((tag, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => this.addTagByButton(e, tag)}
                  >
                    {tag}
                  </button>
                );
              })}
              <input
                className='tag-input'
                type='text'
                name='tag'
                onChange={this.handleChanges}
                value={this.state.tag}
              />
              <button onClick={this.addCustomTag}>Add Tag</button>
              {this.state.tags.map((tag, index) => (
                <div className='tag'>
                  <p>{tag}</p>
                  <button onClick={(e) => this.deleteTag(e, index)}>
                    Delete Tag
                  </button>
                </div>
              ))}
            </div>
          </div>

          <h3 className='note-heading'>Note:</h3>
          <input
            className='note-input'
            type='text'
            name='note'
            onChange={this.handleChanges}
            value={this.state.note}
          />

          <button className='add-note-btn' onClick={this.addNote}>
            Add Note
          </button>
          {this.state.fullNote.map((note, index) => (
            <div className='note'>
              <p>{note}</p>
              <button onClick={(e) => this.deleteNote(e, index)}>
                Delete Note
              </button>
            </div>
          ))}
          <span className='add-recipe'>
            <button className='add-recipe-btn' type='submit'>
              Add Recipe
            </button>{" "}
          </span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addingRecipe: state.addingRecipe,
});

export default withRouter(connect(mapStateToProps, { addRecipe })(RecipeForm));
