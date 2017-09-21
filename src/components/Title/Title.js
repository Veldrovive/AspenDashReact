import React, { Component } from 'react';
import { PageHeader } from 'react-bootstrap';

import './Title.css'

export default class Title extends Component{
  render(){
    return(
      <PageHeader>Day {this.props.dayNumber} Information <small className="smallText">Last Updated: {new Date().getTime()}</small></PageHeader>
    )
  }
}