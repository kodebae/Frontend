import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import appReducer from "./reducers";
import "./css/main.css";

import LogIn from "./components/LogIn";
import SignUpPage from "./views/SignUpPage";
import AddRecipe from "./views/AddRecipe";
import RecipesDashboard from "./views/RecipesDashboard";
import SingleRecipe from "./views/SingleRecipe";
import UpdateRecipe from "./views/UpdateRecipe";
import PrivateRoute from "./components/PrivateRoute";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={RecipesDashboard} />
        {/* <Route path='/log-in' component={LoginPage} /> */}
        <Route path='/login'>
          <LogIn />
        </Route>
        <PrivateRoute path='/recipes/view/:id' component={SingleRecipe} />
        <PrivateRoute path='/recipes/edit/:id' component={UpdateRecipe} />
        <PrivateRoute path='/add-recipe' component={AddRecipe} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
