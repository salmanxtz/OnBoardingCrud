import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>ReactCoreCrudApp</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Home
              </NavItem>
            </LinkContainer> 
            <LinkContainer to={'/CustomerContainer/customer'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Customers
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/ProductContainer/product'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Products
              </NavItem>
                    </LinkContainer>
            <LinkContainer to={'/StoreContainer/store'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Stores
              </NavItem>
                    </LinkContainer>
            <LinkContainer to={'/SalesContainer/sales'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Sales
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
