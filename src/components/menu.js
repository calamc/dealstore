"use strict"

// IMPORT REACT
import React from 'react';

// IMPORT STYLINGS FROM REACT BOOTSTRAP
import {NavItem, Navbar, Badge, Nav} from 'react-bootstrap';

class Menu extends React.Component{
  render(){
    return(
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">DealStore</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/search">Search</NavItem>
          <NavItem eventKey={2} href="/favourites">Favourites</NavItem>
          <NavItem eventKey={3} href="/admin">Administrator</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="/basket">Basket
            { (this.props.basketItemsNum > 0) ? (<Badge className="badge">{this.props.basketItemsNum}</Badge>):('')}
          </NavItem>
        </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
  }
}

export default Menu
