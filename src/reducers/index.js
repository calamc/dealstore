"use strict"

// IMPORT REDUX to COMBINE REDUCERS
import {combineReducers} from 'redux';


// Import Combined
import {dealsReducers} from './dealsReducers';
import {basketReducers} from './basketReducers';


// Combine ##SSO
export default combineReducers({
  deals: dealsReducers,
  basket: basketReducers
})
