import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Timepicker.css';
import TimeInput from './TimeInput';
import {validateTime, checkTimeFrame} from './Helper';

class Timepicker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: moment().format('HH:mm'),
      placeholder: 'Enter Time',
      disabled: false,
      steps: 30,
      minHours: (this.props.minHours !== undefined) ? this.props.minHours : 0,
      minMinutes: (this.props.minMinutes !== undefined) ? this.props.minMinutes : 0,
      maxHours: (this.props.maxHours !== undefined) ? this.props.maxHours : 23,
      maxMinutes: (this.props.maxMinutes !== undefined) ? this.props.maxMinutes : 59,
      showInput: false,
      oldTime: (this.props.defaultValue !== undefined) ? this.props.defaultValue : new Date(),
      timeList: [],
    }
  }

  componentDidMount() {
    this.createTimeList();
    window.addEventListener("click", (e) => { this.onWindowClick(e); });
    this.updateState();
  }

  // Update State Based on values
  updateState() {
    let stateObj = {};

    let currDate = this.props.defaultValue;
    let placeholder = this.props.placeholder;
    let disabled = this.props.disabled;
    let steps = this.props.steps;
    let minHours = this.props.minHours;
    let minMinutes = this.props.minMinutes;
    let maxHours = this.props.maxHours;
    let maxMinutes = this.props.maxMinutes;
    let oldTime = this.props.defaultValue;

    // Check Passed Date
    if (currDate !== undefined) {
      if (new Date(currDate) !== 'Invalid Date') {
        stateObj['currDate'] = moment(currDate).format('HH:mm');
        stateObj['oldTime'] = oldTime;
      } else {
        stateObj['currDate'] = moment().format('HH:mm');;
        stateObj['oldTime'] = new Date();
      }
    }

    // Check Passed Placeholder
    if (placeholder !== undefined) {
      stateObj['placeholder'] = placeholder;
    }
    // Check disabled
    if (disabled !== undefined) {
      stateObj['disabled'] = disabled;
    }
    // Steps 
    if (steps !== undefined) {
      if (steps !== 15 && steps !== 30 && steps !== 60) {
        stateObj['steps'] = 30;
      } else {
        stateObj['steps'] = steps;
      }
    }
    // Set Min Hours
    if (minHours !== undefined) {
      if (minHours < 0 || minHours > 23) {
        stateObj['minHours'] = 0;
      } else {
        stateObj['minHours'] = minHours;
      }
    }
    // Set Min Minutes
    if (minMinutes !== undefined) {
      if (minMinutes < 0 || minMinutes > 59) {
        stateObj['minMinutes'] = 0;
      } else {
        stateObj['minMinutes'] = minMinutes;
      }
    }
    // Set Min Hours
    if (maxHours !== undefined) {
      if (maxHours < 0 || maxHours > 23) {
        stateObj['maxHours'] = 0;
      } else {
        stateObj['maxHours'] = maxHours;
      }
    }
    // Set Max Minutes
    if (maxMinutes !== undefined) {
      if (maxMinutes < 0 || maxMinutes > 59) {
        stateObj['maxMinutes'] = 0;
      } else {
        stateObj['maxMinutes'] = maxMinutes;
      }
    }

    this.setState(stateObj);
  }

  // Close timepicker on window click
  onWindowClick(e) {
    if (e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'SPAN') {
      this.setState({ showInput: false });
    }
  }

  // Create Time List
  createTimeList() {
    let date = new Date();
    // Create a new Date
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    let steps = parseInt(this.state.steps);
    let loopLength = 0;

    // Set Loop value for Steps
    if (steps === 60) {
      loopLength = 24;
    } else if (steps === 30) {
      loopLength = (24 * 2);
    } else if (steps === 15) {
      loopLength = (24 * 4);
    }

    let timeList = [];
    // Time Frame Obj 
    let timeFrameObj = {
      minHours: this.state.minHours,
      minMinutes: this.state.minMinutes,
      maxHours: this.state.maxHours,
      maxMinutes: this.state.maxMinutes,
    }

    // Generate new Time List Array
    for (let i=0; i< loopLength; i++) {
      let tempDate = new Date(newDate);
      tempDate.setMinutes((i * steps));
      // Check time Frame
      if (checkTimeFrame(tempDate, timeFrameObj)) {
        timeList.push(tempDate);
      }
    }
    this.setState({ timeList: timeList });
  }

  // On Time Change Function
  onTimeChange(e) {
    let value = e.target.value;
    this.setState({ value: e.target.value }, () => {
      this.props.onTimeUpdate(value);
    });
  }

  // Set Time on Time Click
  setTime(date) {
    let dateText = moment(date).format('HH:mm');
    this.setState({ value: dateText, oldTime: date, showInput: false }, () => {
        this.props.onTimeUpdate(date);
    });
  }

  // On Change Event
  onChange(e) {
    this.setState({ value: e.target.value });
  }

  // on Text input focus
  showInput() {
    this.setState({ showInput: true });
  }

  // On Enter Set new Date
  onkeypress(e) {
    if (e.key === 'Enter') {
      let value = e.target.value;
      let date = new Date();
      let newDate;
      // Create a new Date
      if (validateTime(value)) {
        newDate = new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${value}:00`);
      } else {
        newDate = this.state.oldTime;
      }
      // Set Final Date
      let dateText = moment(newDate).format('HH:mm');
      this.setState({ value: dateText, oldTime: newDate, showInput: false }, () => {
          this.props.onTimeUpdate(newDate);
      });
    }
  }

  render() {
    let value = this.state.value;
    let placeholder = this.state.placeholder;
    let disabled = this.state.disabled;
    let timeArr = this.state.timeList;
    let focused = this.state.showInput;

    return (
      <div className="react-custom-time-picker">
          <TimeInput
              focused={focused}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              showInput={() => this.showInput() }
              onChange= {(e) => this.onChange(e)}
              onkeypress= {e => this.onkeypress(e)}
          />
          {this.state.showInput && 
            <div className="time-component">
              <div className="component-card">
                {timeArr.length > 0 && timeArr.map((data, index) => 
                  <div className="card-item" key={`time${index}`} onClick={() => this.setTime(data)}>
                    <span className="item-value">{moment(data).format('HH:mm')}</span>
                  </div> 
                )}
              </div>
            </div>
          }
      </div>
    );
  }
}

Timepicker.propTypes = {
  onTimeUpdate: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  steps: PropTypes.number,
  minHours: PropTypes.number,
  minMinutes: PropTypes.number,
  maxHours: PropTypes.number,
  maxMinutes: PropTypes.number,
  showInput: PropTypes.bool,
  oldTime: PropTypes.instanceOf(Date),
};

export default Timepicker;