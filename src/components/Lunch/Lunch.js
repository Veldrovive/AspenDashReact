import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';
import request from 'request'
import './Lunch.css';

export default class Lunch extends Component{
  constructor(){
    super();
    this.state = {special: 'Loading...'};
  }

  componentDidMount(){
    this.getLunchInfo();
    setInterval(this.getLunchInfo(), 600000);
  }

  getLunchInfo(){
    request.get('https://melroseschools.nutrislice.com/menu/api/weeks/school/melrose/menu-type/lunch/'+new Date().getFullYear()+'/00/00/?format=json', (err, res, body) => {
      body = JSON.parse(body);
      const lunch = body.days[new Date().getDay()].menu_items[1].food.name;
      if(typeof lunch !== 'undefined'){
        this.setState({special: lunch});
      }else{
        this.setState({special: 'No Lunch Served'});
      }
    })
  }

  render(){
    //3: 4
    //1: 12
    //2: 6
    return(
      <Col sm={this.props.size}>
        <Panel bsStyle="danger" header="Lunch Special" className="lunch-panel">
          {this.state.special}
        </Panel>
      </Col>
    )
  }
}