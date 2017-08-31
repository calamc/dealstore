"use strict"

export function basketReducers(state={basket:[]}, action){

 switch(action.type){
   case "ADD_TO_BASKET":
   return {...state, basket:action.payload, // remove basket: if error persists
   totalAmount: totals(action.payload).amount,
   totalQuan: totals(action.payload).qty}
   break;

   case "GET_BASKET":
   return{...state, basket:action.payload,
   totalQuan:totals(action.payload).qty,
   totalAmount:totals(action.payload).amount}

   case "UPDATE_BASKET":
  //  const currentDealToUpdate = [...state.basket]
  //  const indexToUpdate = currentDealToUpdate.findIndex(function(deal){
  //    return deal._id === action._id;})
   //
  //  const newDealToUpdate = {
  //  ...currentDealToUpdate[indexToUpdate],
  //  quantity: currentDealToUpdate[indexToUpdate].quantity + action.quan
  //  }
   //
  //  let basketUpdate = [...currentDealToUpdate.slice(0, indexToUpdate), newDealToUpdate, ...currentDealToUpdate.slice(indexToUpdate + 1)]

   return {...state, basket:action.payload,
     totalAmount: totals(action.payload).amount,
     totalQuan: totals(action.payload).qty} // remove basket: if error persists
   break;

   case "DELETE_BASKET_ITEM":
   return {...state, basket:action.payload, // remove basket: if error persists
     totalAmount: totals(action.payload).amount,
     totalQuan: totals(action.payload).qty}
   break;
   }
   return state
}

// TOTAL BASKET
export function totals(payloadArr){
 const totalAmount = payloadArr.map(function(basketArr){
   return basketArr.price * basketArr.quantity;
 }).reduce(function(y, z) {
   return y + z;
 }, 0);

 const totalQuan = payloadArr.map(function(qty){
   return qty.quantity;
 }).reduce(function(y, z) {
   return y + z;
 }, 0);

 return {amount:totalAmount.toFixed(2),qty:totalQuan}
}
