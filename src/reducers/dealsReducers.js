"use strict"

export function dealsReducers(state={
  deals:[]
  }, action){
  switch(action.type){
    case "GET_DEALS":
    return {...state, deals:[...action.payload]}
    break;

    // ADD EAL
    case "POST_DEAL":
    return {...state, deals: [...state.deals, ...action.payload], msg:'Deal added successfully!', style:'success',
        val:'success'}
    break;

    // MESSAGE FOR ERROR ON ADDING DEAL
    case "POST_DEAL_DECLINED":
    return {...state, msg:'Restart process please', style:'danger', val:'error'}
    break;

    // CLEAR FORM TEXT BUTTON
    case "CLEAR_BUTTON":
    return {...state, msg:null, style:'primary', val:null}
    break;

    case "DELETE_DEAL":
     const currentDealToDelete = [...state.deals]

     const indexToDelete = currentDealToDelete.findIndex(
     function(deal){
     return deal._id == action.payload;
     }
     )
     return {deals: [...currentDealToDelete.slice(0, indexToDelete), ...currentDealToDelete.slice(indexToDelete + 1)]}
     break;

     case "UPDATE_DEAL":
     const currentDealToUpdate = [...state.deals]
     const indexToUpdate = currentDealToUpdate.findIndex(function(deal){
       return deal._id === action.payload._id;})

     const newDealToUpdate = {
     ...currentDealToUpdate[indexToUpdate],
     title: action.payload.title
     }
     console.log("what is deal:##",newDealToUpdate);

     return {deals:[...currentDealToUpdate.slice(0, indexToUpdate), newDealToUpdate, ...currentDealToUpdate.slice(indexToUpdate + 1)]}
     break;
    }
  return state
}
