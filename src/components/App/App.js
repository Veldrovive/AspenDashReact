// src/components/App/index.js
import React, { Component } from 'react';
//import rp from 'request-promise';
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
    this.state = {schedule: null, currentBlock: null, dayNumber: null, displayExceptions: {}};
    this.getAspenInfo()
      .then(res => {
        console.log(res);
        this.setState({schedule: res.schedule.blockSchedule, currentBlock: res.schedule.block, dayNumber: res.schedule.day, announcements: res.announcements.hs})
      });
    this.getDisplayExceptions = this.getDisplayExceptions.bind(this);
    this.setDisplayException = this.setDisplayException.bind(this);
    this.toggleDisplayException = this.toggleDisplayException.bind(this);
  }

  componentDidMount(){
    this.getDisplayExceptions();
  }

  checkDayPercentage(){
    /*let start = new Date().setHours(7, 45);
    let oneEnd = new Date().setHours(8, 42);
    let twoStart = new Date().setHours(8, 45);
    let twoEnd = new Date().setHours(9, 37);
    let advStart = new Date().setHours(9, 40);
    let advEnd = new Date().setHours(10, 10);
    let threeStart = new Date().setHours(10, 13);
    let threeEnd = new Date().setHours(11, 5);
    let fourStart = new Date().setHours(11, 5);
    let fourEnd = new Date().setHours(12, 24);
    let fiveStart = new Date().setHours(12, 27);
    let fiveEnd = new Date().setHours(13, 17);
    let sixStart = new Date().setHours(13, 20);
    let end = new Date().setHours(14, 11);

    const totalTime = end-start;
    console.log("One end through day: ",((oneEnd-start)/totalTime)*100);
    console.log("Two start through day: ",((twoStart-start)/totalTime)*100);
    console.log("Two end through day: ",((twoEnd-start)/totalTime)*100);
    console.log("Adv start through day: ",((advStart-start)/totalTime)*100);
    console.log("Adv end through day: ",((advEnd-start)/totalTime)*100);
    console.log("Three start through day: ",((threeStart-start)/totalTime)*100);
    console.log("Three end through day: ",((threeEnd-start)/totalTime)*100);
    console.log("Four start through day: ",((fourStart-start)/totalTime)*100);
    console.log("Four end through day: ",((fourEnd-start)/totalTime)*100);
    console.log("Five start through day: ",((fiveStart-start)/totalTime)*100);
    console.log("Five end through day: ",((fiveEnd-start)/totalTime)*100);
    console.log("Six start through day: ",((sixStart-start)/totalTime)*100);
    console.log("Six end through day: ",((end-start)/totalTime)*100);
    console.log("Current percent through day: ",((new Date()-start)/totalTime)*100)*/
  }

  getDisplayExceptions(){
    const loadedState = loadState();
    console.log("State: ",loadedState);
    if(typeof loadedState === 'object') {
      this.setState({displayExceptions: loadedState});
      console.log("Current Component State: ",this.state);
    }else{
      let defaultDisplay = {pageTitle: true, schedule: true, dayTimer: true, blockTimer: true, lunch: true, announcements: true};
      this.setState({displayExceptions: defaultDisplay});
      console.log("Display Exceptions: ",defaultDisplay);
      saveState(defaultDisplay);
      console.log("Current Component State: ",this.state);
    }
  }

  setDisplayException(id, value){
    let newExceptions = this.state.displayExceptions;
    console.log("Setting object: ",id," to ",value);
    newExceptions[id] = value;
    this.setState({displayExceptions: newExceptions});
    saveState(this.state.displayExceptions);
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
    this.checkDayPercentage();
    return (
      <div className="main-container">
        <Header setDisplay={this.toggleDisplayException}/>
        <div className="mainInfoWrapper">
          {this.state.displayExceptions.pageTitle ?
            <PageTitle dayNumber={this.state.dayNumber}/>
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
              <DayTimer isHalfDay={false}/>
              :
              <div/>
            }
            {this.state.displayExceptions.blockTimer ?
              <BlockTimer/>
              :
              <div/>
            }
            {this.state.displayExceptions.lunch ?
              <Lunch/>
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