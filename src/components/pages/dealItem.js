"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Row, Col, Well, Button, Image} from 'react-bootstrap';


import {addToBasket, updateBasket} from '../../actions/basketActions';

class DealItem extends React.Component{
  constructor(){
    super();
    this.state = {isClicked: false};
  }

  readMore(){
    this.setState({isClicked: true})
  }
  handleBasket(){
     const deal = [...this.props.basket, {
       _id:this.props._id,
       title:this.props.title,
       description:this.props.description,
       price:this.props.price,
       images: this.props.images,
       quantity: 1
     }]

     if(this.props.basket.length > 0) {
      let _id = this.props._id;

      let basketIndex = this.props.basket.findIndex(function(basket){
        return basket._id === _id;
      })
      if (basketIndex === -1){
        this.props.addToBasket(deal);
      } else {
        this.props.updateBasket(_id, 1, this.props.basket)
      }
     } else {
      this.props.addToBasket(deal);
     }

  //      let _id = this.props._id;
  //      let basketIndex = this.props.basket.findIndex(function(basket){
  //        return basket._id === _id;
  //      })
   //
  //    if (basketIndex === -1){
  //      this.props.addToBasket(deal);
  //    } else {
  //      this.props.updateBasket(_id, 1)
  //    }
  //  } else {
  //    this.props.addToBasket(deal);
  //  }
  }
   render(){
     return(
       <Well>
         <Row>
           <Col xs={6} md={6}>
             <Image src={this.props.images} responsive />
           </Col>
           <Col xs={12} md={12}>
             <h6>{this.props.title}</h6>
             <p>{(this.props.description.length > 30 && this.state.isClicked === false)?(this.props.description.substring(0,30)):(this.props.description)}</p>
             <button className='readmoreLink'
               onClick={this.readMore.bind(this)}>
                 {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 30)?('..read more'):('')}
               </button>
             <h6>€ {this.props.price}</h6>
             <Button bsStyle='info' onClick={this.handleBasket.bind(this)}>Add to Basket</Button>
           </Col>
         </Row>
       </Well>
     )
    }
  }

function mapStateToProps(state){
  return{
    basket:state.basket.basket
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToBasket:addToBasket,
    updateBasket:updateBasket
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DealItem);
