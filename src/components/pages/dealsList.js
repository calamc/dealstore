"use strict"


import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getDeals} from '../../actions/dealsActions';
import DealItem from './dealItem';
import DealsForm from './DealsForm';
import Basket from './basket';

import {Grid, Col, Row, Button} from 'react-bootstrap';


class DealsList extends React.Component{
  componentDidMount(){
    this.props.getDeals();
  }
 render(){
   const dealsList = this.props.deals.map(function(dealsArr){
 return(
   <Col xs={12} sm={6} md={4} key={dealsArr._id}>
     <DealItem
     _id= {dealsArr._id}
     title={dealsArr.title}
     description={dealsArr.description}
     price={dealsArr.price}
     images={dealsArr.images}/>
   </Col>
 )
})
   return(
     <Grid>
       <Row>
         <Basket />
       </Row>
       <Row>
         {dealsList}
       </Row>
     </Grid>
   )
 }
}

function mapStateToProps(state){
 return{
   deals: state.deals.deals
 }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getDeals:getDeals}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsList);
