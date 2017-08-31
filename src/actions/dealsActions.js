"use strict"

import axios from 'axios';

// GET DEALS
export function getDeals(){
  return function(dispatch){
     axios.get("/api/deals")
     .then(function(response){
       dispatch({type:"GET_DEALS", payload:response.data})
     })
     .catch(function(err){
       dispatch({type:"GET_DEALS_DECLINED", payload:"Unable to get deals at this time"})
     })
   }
}

// POST DEALS
export function postDeals(deal){
 // return {
 // type:"POST_DEAL",
 // payload: deal
 // }
 return function(dispatch){
    axios.post("/api/deals", deal)
    .then(function(response){
      dispatch({type:"POST_DEAL", payload:response.data})
    })
    .catch(function(err){
      dispatch({type:"POST_DEAL_DECLINED", payload:"An error occured while adding new deal"})
    })
  }
}
// DELETE DEAL
export function deleteDeals(id){
  return function(dispatch){
     axios.delete("/api/deals/" + id)
     .then(function(response){
       dispatch({type:"DELETE_DEAL", payload:id})
     })
     .catch(function(err){
       dispatch({type:"DELETE_DEAL_DECLINED", payload:"Unable to delete deal, reason unknow"})
     })
   }
}
// UPDATE DEAL
export function updateDeals(deal){
 return {
 type:"UPDATE_DEAL",
 payload: deal
 }
}


// CLEAR FORM BTN
export function clearButton(){
 return {
 type:"CLEAR_BUTTON"
 }
}
