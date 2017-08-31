"use strict"

import axios from 'axios';

// ADD BASKET
export function addToBasket(basket){
  return function(dispatch){
    axios.post("/api/basket", basket)
    .then(function(response){
      dispatch({type:"ADD_TO_BASKET", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"ADD_TO_BASKET_DECLINED", msg: 'error when adding to basket'})
     })
   }
}

// GET BASKET FROM SESSION
export function getBasket(){
  return function(dispatch){
    axios.get('/api/basket')
    .then(function(response){
      dispatch({type:"GET_BASKET", payload:response.data})
  })
 .catch(function(err){
   dispatch({type:"GET_BASKET_DECLINED", msg:"error"})
 })
 }
}

// UPDATE BASKET
export function updateBasket(_id, quan, basket){
   const currentDealToUpdate = basket
   const indexToUpdate = currentDealToUpdate.findIndex(function(deal){
     return deal._id === _id;})

   const newDealToUpdate = {
   ...currentDealToUpdate[indexToUpdate],
   quantity: currentDealToUpdate[indexToUpdate].quantity + quan
   }

   let basketUpdate = [...currentDealToUpdate.slice(0, indexToUpdate), newDealToUpdate, ...currentDealToUpdate.slice(indexToUpdate + 1)]

   return function(dispatch){
     axios.post("/api/basket", basketUpdate)
     .then(function(response){
       dispatch({type:"UPDATE_BASKET", payload:response.data})
     })
     .catch(function(err){
       dispatch({type:"UPDATE_BASKET_DECLINED", msg: 'error when adding to basket'})
      })
    }

  // return{
  //   type:"UPDATE_BASKET",
  //   payload:basketUpdate
  // }
}

// DELETE BASKET
export function deleteBasketItem(basket){
  return function(dispatch){
    axios.post("/api/basket", basket)
    .then(function(response){
      dispatch({type:"DELETE_BASKET_ITEM", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"DELETE_BASKET_ITEM_DECLINED", msg: 'problem removing deal from basket'})
     })
   }

   //Testing
  // return{
  //   type:"DELETE_BASKET_ITEM",
  //   payload: basket
  // }
}
