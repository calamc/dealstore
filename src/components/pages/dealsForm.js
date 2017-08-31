"use strict"

import React from 'react';
import axios from 'axios';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button, Image, DropdownButton, InputGroup, Row, Col, MenuItem} from 'react-bootstrap';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';

import {postDeals, deleteDeals, getDeals, clearButton} from '../../actions/dealsActions';

class DealsForm extends React.Component{
  constructor() {
    super();
    this.state = {
      images:[{}],
      image: ''
    }
  }

  componentDidMount() {
    // GET DEALS
    this.props.getDeals();
    axios.get('/api/images/')
    .then(function(response){
      this.setState({images: response.data});
    }.bind(this)) // keep in context
    .catch(function(err){
      this.setState({images:'Unable to render images at this time', image:''})
    }.bind(this))
  }
  handleSubmit(){
    const deal=[{
       title: findDOMNode(this.refs.title).value,
       description: findDOMNode(this.refs.description).value,
       price: findDOMNode(this.refs.price).value,
       images: findDOMNode(this.refs.image).value
       }]

       this.props.postDeals(deal);
  }

  clearTheForm(){
    findDOMNode(this.refs.title).value ='';
    findDOMNode(this.refs.description).value='';
    this.setState({image:''});
    findDOMNode(this.refs.price).value='';

    // CLEAR BUTTON
    this.props.clearButton();

  }

  handleSelectedImage(image){
    this.setState({image: '/images/' + image}) // concat name

  }

  onDelete(){
    let dealId = findDOMNode(this.refs.delete).value;
    this.props.deleteDeals(dealId);
  }

  render(){
    const imagesList = this.state.images.map(function(imageArray, i){
      return(
        <MenuItem key={i} onClick={this.handleSelectedImage.bind(this, imageArray.name)} eventKey={imageArray.name}>{imageArray.name}</MenuItem>
      )
    }, this)

     const dealsList = this.props.deals.map(function(dealsArr){
       return (<option key={dealsArr._id}>{dealsArr.title}</option>)
     })

     return(
       <Well>
         <Row>
           <Col sm={8} xs={12} md={12}>
             <Panel>
               <FormGroup controlId="title" validationState={this.props.val}>

                 <ControlLabel>Title</ControlLabel>
                   <FormControl
                   type="text"
                   placeholder="Deal Title"
                   ref="title" />
                   <FormControl.Feedback/>
                </FormGroup>

                <FormGroup controlId="description" validationState={this.props.val}>

                  <ControlLabel>Description</ControlLabel>
                   <FormControl
                   type="text"
                   placeholder="Deal description"
                   ref="description" />
                   <FormControl.Feedback/>
                   </FormGroup>

                 <FormGroup controlId="price" validationState={this.props.val}>

                <ControlLabel>Price</ControlLabel>
                 <FormControl
                 type="text"
                 placeholder="Price in €'s'"
                 ref="price" />
                 <FormControl.Feedback/>
                 </FormGroup>

                 <FormGroup controlId="imageSelector">
                 <InputGroup>
                  <FormControl type="text" ref="image" value={this.state.image}/>
                  <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Choose image" bsStyle="primary">
                    {imagesList}
                  </DropdownButton>
                </InputGroup>
                <Image className="myImage" src={this.state.image} responsive/>
              </FormGroup>
                 <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.clearTheForm.bind(this))} bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                   {/* Conditionally render add button */}
                   {(!this.props.msg)?("Add Deal"):(this.props.msg)}
                 </Button>
             </Panel>
             <Panel >
               <FormGroup controlId="formControlsSelect">
                 <ControlLabel>Choose deal to delete</ControlLabel>
                  <FormControl ref="delete" componentClass="select" placeholder="select">
                   <option value="select">Choose</option>
                    {dealsList}
                  </FormControl>
               </FormGroup>
               <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Remove deal</Button>
            </Panel>
           </Col>
           {/* <Col>
             <Panel>
               <InputGroup>
                <FormControl type="text" ref="image" value=""/>
                <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Choose image" bsStyle="primary">
                  {imagesList}
                </DropdownButton>
              </InputGroup>
              <Image src="" responsive/>
             </Panel>

           </Col> */}
         </Row>

       </Well>
     )
   }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postDeals, deleteDeals, getDeals, clearButton}, dispatch)
}

function mapStateToProps(state){
  return {
    deals: state.deals.deals,
    style: state.deals.style,
    msg: state.deals.msg,
    val: state.deals.val
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(DealsForm);
