"use strict"
// import axios from 'axios';
// function handleRender(req, res){axios.get('http://localhost:3001/deals')
// .then(function(response){
//
// // var myHtml = JSON.stringify(response.data);
// //
// // res.render('index', {myHtml});
//
// })
// .catch(function(err){console.log('#Initial Servrendering error', err);
//  })
// }
// module.exports = handleRender;

import axios from 'axios';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers/index';
import routes from './src/routes';
import {match, RouterContext} from 'react-router';


function handleRender(req, res){
  axios.get('http://localhost:3001/deals')
  .then(function(response){
 const store = createStore(reducers, {"deals":{"deals":response.data}})

 const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g,'<\\!--');

 const Routes ={ routes:routes, location:req.url}

 match(Routes, function(error, redirect, props){
   if(error){
     res.status(500).send("Error fullfilling the request");
   } else if(redirect){
     res.status(302, redirect.pathname + redirect.search)
   } else if(props){
     const reactComponent = renderToString(
       <Provider store={store}>
         <RouterContext {...props}/>
       </Provider>
 )
 res.status(200).render('index', {reactComponent, initialState})} else {
   res.status(404).send('Not Found')
 }
})
})
.catch(function(err){
 console.log('########ERROR##########', err);
 })
}
module.exports = handleRender;
