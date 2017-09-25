// src/components/App/index.js
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import './Header.css';

class Header extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  constructor(){
    super();
    this.handleSetDisplay = this.handleSetDisplay.bind(this);
  }

  handleSetDisplay(item){
    this.props.setDisplay(item);
  }

  render() {
    let except = this.props.exceptions;
    return (
      <Navbar inverse collapseOnSelect className="header">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/test" className="header-m">{this.props.loaded ? 'M' : <span className="glyphicon glyphicon-refresh spinning"/>}</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={() => this.handleSetDisplay()}>Melrose High School</NavItem>
            <NavItem eventKey={2} href="/test">Toggle Notifications</NavItem>
            <NavDropdown eventKey={3} title="Display Settings" id="display-settings">
              <MenuItem onClick={() => this.handleSetDisplay('pageTitle')}>Title{except.pageTitle ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('schedule')}>Schedule{except.schedule ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('dayTimer')}>Day Timer{except.dayTimer ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('blockTimer')}>Block Timer{except.blockTimer ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('lunch')}>Lunch{except.lunch ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('announcements')}>Announcements{except.announcements ? <i className="fa fa-check-square-o header-check-box" aria-hidden="true"></i> : <i className="fa fa-square-o header-check-box" aria-hidden="true"></i>}</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;