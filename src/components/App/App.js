// src/components/App/index.js
import React, { Component } from 'react';
import request from 'request';
import { Row } from 'react-bootstrap';

import Header from '../Header/Header';
import PageTitle from '../Title/Title';
import Schedule from '../Schedule/Schedule'
import Announcements from '../Announcements/Announcements';
import DayTimer from '../DayTimer/DayTimer';
import BlockTimer from '../BlockTimer/BlockTimer';
import Lunch from '../Lunch/Lunch';
import { loadState, saveState } from '../../localstorage';

import './App.css';


class App extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}
  constructor(props){
    super(props);
    this.state = {schedule: null, currentBlock: null, dayNumber: null, asOf: 0, displayExceptions: {}};
    this.getAspenInfo()
      .then(res => {
        this.setState({asOf: res.asOf, schedule: res.schedule.blockSchedule, currentBlock: res.schedule.block, dayNumber: res.schedule.day, announcements: res.announcements.hs})
      });
    this.getDisplayExceptions = this.getDisplayExceptions.bind(this);
    this.setDisplayException = this.setDisplayException.bind(this);
    this.toggleDisplayException = this.toggleDisplayException.bind(this);
    this.getQueryStringOverrides = this.getQueryStringOverrides.bind(this);
  }

  componentDidMount(){
    this.getDisplayExceptions();
  }

  getDisplayExceptions(){
    const loadedState = loadState();
    if(typeof loadedState === 'object') {
      this.setState({displayExceptions: loadedState});
    }else{
      let defaultDisplay = {pageTitle: true, schedule: true, dayTimer: true, blockTimer: true, lunch: true, announcements: true};
      this.setState({displayExceptions: defaultDisplay});
      saveState(defaultDisplay);
    }
    setTimeout(this.getQueryStringOverrides(), 1000);
  }

  setDisplayException(id, value){
    let newExceptions = this.state.displayExceptions;
    newExceptions[id] = value;
    this.setState({displayExceptions: newExceptions});
    saveState(this.state.displayExceptions);
  }

  getQueryStringOverrides(){
    function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    console.log("The value of hideSchedule is: ",getParameterByName('hideSchedule'));

    if(getParameterByName('hideSchedule') === 'true'){
      let newExceptions = this.state.displayExceptions;
      newExceptions.schedule = false;
      console.log("Setting exceptions to: ",newExceptions);
      this.setState({displayExceptions: newExceptions});
    }
  }

  toggleDisplayException(id){
    let newExceptions = this.state.displayExceptions;
    if(typeof newExceptions[id] === 'undefined'){
      return false;
    }else{
      if(newExceptions[id]){
        newExceptions[id] = false;
      }else{
        newExceptions[id] = true;
      }
      this.setState({displayExceptions: newExceptions});
      saveState(newExceptions);
    }
  }

  getAspenInfo(){
    return new Promise(resolve => {
      request.get('https://mhs-aspencheck-serve.herokuapp.com/', (err, res, body) => {
        resolve(JSON.parse(body));
      })
    });
  }

  render() {
    let colDisplayed = 0;
    let size;
    if(this.state.displayExceptions.dayTimer) colDisplayed++;
    if(this.state.displayExceptions.blockTimer) colDisplayed++;
    if(this.state.displayExceptions.lunch) colDisplayed++;
    if(colDisplayed === 1) size = 12;
    if(colDisplayed === 2) size = 6;
    if(colDisplayed === 3) size = 4;
    return (
      <div className="main-container">
        <Header setDisplay={this.toggleDisplayException} exceptions={this.state.displayExceptions}/>
        <div className="mainInfoWrapper">
          {this.state.displayExceptions.pageTitle ?
            <PageTitle dayNumber={this.state.dayNumber} asOf={this.state.asOf}/>
            :
            <div/>
          }
          {this.state.displayExceptions.schedule ?
            <Schedule schedule={this.state.schedule} currentBlock={this.state.currentBlock}/>
            :
            <div/>
          }
          <Row>
            {this.state.displayExceptions.dayTimer ?
              <DayTimer size={size} isHalfDay={false}/>
              :
              <div/>
            }
            {this.state.displayExceptions.blockTimer ?
              <BlockTimer size={size}/>
              :
              <div/>
            }
            {this.state.displayExceptions.lunch ?
              <Lunch size={size}/>
              :
              <div/>
            }
          </Row>
          {this.state.displayExceptions.announcements ?
            <Announcements announcements={this.state.announcements} cycleTime={8000}/>
            :
            <div/>
          }
        </div>
      </div>
    );
  }
}

export default App;