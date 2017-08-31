"use strict"

import React from 'react';
import {Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import {deleteBasketItem, addToBasket, updateBasket, getBasket} from '../../actions/basketActions';

class Basket extends React.Component{
  componentDidMount(){
    this.props.getBasket();
  }
  constructor(){
     super();
     this.state = { showModal:false }
   }
  open(){
    this.setState({showModal:true})}
  close(){
    this.setState({showModal:false})}

  // QUANITITYS
  onIncrement(_id){
    this.props.updateBasket(_id, 1, this.props.basket);
  }
  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateBasket(_id, -1, this.props.basket);
    }
  }

  onDelete(_id){

    const currentDealToDelete = this.props.basket;

    const indexToDelete = currentDealToDelete.findIndex(function(basket){
      return basket._id === _id;
    }
  )

  let basketAfterDelete = [...currentDealToDelete.slice(0, indexToDelete), ...currentDealToDelete.slice(indexToDelete + 1)]

  this.props.deleteBasketItem(basketAfterDelete);
}

  render(){
       if(this.props.basket[0]){
         return this.renderBasket();
         } else {
           return this.renderEmpty();
         }
        }

  renderEmpty(){
   return(<div></div>)
  }
  renderBasket(){
    const basketItemsList = this.props.basket.map(function(basketArr){
      return(
        <Panel key={basketArr._id}>
           <Row>

               <Col xs={12} sm={4} md={12}>
                 <h6>{basketArr.title}</h6>
               </Col>

               <Col xs={12} sm={2}>
                 <h6>€ {basketArr.price}</h6>
               </Col>

               <Col xs={12} sm={2}>
                 <h6>Quantity: <Label bsStyle="info">{basketArr.quantity}</Label></h6>
               </Col>

              <Col xs={6} sm={4}>
               <ButtonGroup style={{minWidth:'350px'}}>
                 <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, basketArr._id, basketArr.quantity)}>-</Button>
                 <Button bsStyle="default" bsSize="small" onClick={this.onIncrement.bind(this, basketArr._id)}>+</Button>
                 <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this, basketArr._id)}>Remove</Button>
               </ButtonGroup>
              </Col>
           </Row>
        </Panel>
        )
   }, this)

   return(
   <Panel header="Basket" bsStyle="info">
   {basketItemsList}
   <Row>
     <Col xs={12}>
       <h6>Price: {this.props.totalAmount} </h6>
       <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">Confirm order</Button>
     </Col>
    </Row>
     <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
       <Modal.Header closeButton>
         <Modal.Title>Hooray!</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <h6>Success.</h6>
         <p>Email confirmation sent to ...</p>
       </Modal.Body>
       <Modal.Footer>
         <Col xs={6}>
           <h6>€ </h6>
         </Col>
         <Button onClick={this.close.bind(this)}>Close</Button>
       </Modal.Footer>
     </Modal>
   </Panel>
     )
   }
}
function mapStateToProps(state){
 return{
 basket: state.basket.basket,
 totalAmount: state.basket.totalAmount,
 }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteBasketItem,
    updateBasket,
    getBasket
  }, dispatch)
}
export default
connect(mapStateToProps, mapDispatchToProps)(Basket);
