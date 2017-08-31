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
import routes from './routes'

import Basket from './components/pages/basket';
import DealsForm from './components/pages/dealsForm';

import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

const middleware = applyMiddleware(thunk, logger);

const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

// REACT ROUTER ROUTING PATHS
const Routes = (
  <Provider store={store}>
    {routes}
    </Provider>
)

// RENDER ROUTES TO SCREEN
render(
  Routes, document.getElementById('app')
);
