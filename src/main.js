"use strict"


// IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// IMPORT COMPONETS
import Menu from './components/menu';
import Footer from './components/footer';
import {getBasket} from '../src/actions/basketActions';


class Main extends React.Component{
  componentDidMount(){
    this.props.getBasket();
  }
  render(){
    return(
      <div>
        <Menu basketItemsNum={this.props.totalQuan} />
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBasket:getBasket
  }, dispatch)
}

function mapStateToProps(state){
  return {
    totalQuan: state.basket.totalQuan
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
