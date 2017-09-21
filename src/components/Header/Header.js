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
    return (
      <Navbar inverse collapseOnSelect className="header">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/test">Aspen-Dash</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={() => this.handleSetDisplay()}>Melrose High School</NavItem>
            <NavItem eventKey={2} href="/test">Toggle Notifications</NavItem>
            <NavDropdown eventKey={3} title="Display Settings" id="display-settings">
              <MenuItem onClick={() => this.handleSetDisplay('pageTitle')}>Title</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('schedule')}>Schedule</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('dayTimer')}>Day Timer</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('blockTimer')}>Block Timer</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('lunch')}>Lunch</MenuItem>
              <MenuItem onClick={() => this.handleSetDisplay('announcements')}>Announcements</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;