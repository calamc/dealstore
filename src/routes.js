"use strict"

import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';

import reducers from './reducers/index';
import {addToBasket} from './actions/basketActions';
import {postDeals, updateDeals, deleteDeals} from './actions/dealsActions';
import DealsList from './components/pages/dealsList';
import Menu from './components/menu';
import Footer from './components/footer';
import Main from './main';

import Basket from './components/pages/basket';
import DealsForm from './components/pages/dealsForm';

import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';


// REACT ROUTER ROUTING PATHS
const routes = (
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={DealsList}/>
          <Route path="/basket" component={Basket}/>
          <Route path="/admin" component={DealsForm}/>
        </Route>
      </Router>
)

// RENDER ROUTES TO SCREEN
export default routes
