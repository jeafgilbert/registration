import React from 'react';
import ReactTooltip from 'react-tooltip';

class DateInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: ''
    };
  }

  // This function fires everytime parent's Register button is clicked.
  componentDidUpdate() {
    // No conditional statement needed, because data-tip empty string hides tooltip for <ReactTooltip /> with null children
    ReactTooltip.show(this.inputRef);
  }

  renderMonths() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <select name="month" className="form-control autoWidth" onChange={this.handleChange}>
        <option value="">(Month)</option>
        {[...Array(12)].map((x, i) =>
          <option key={i} value={i + 1}>{months[i]}</option>
        )}
      </select>
    );
  }

  renderDays() {
    return (
      <select name="day" className="form-control ml-2 autoWidth" onChange={this.handleChange}>
        <option value="">(Date)</option>
        {[...Array(31)].map((x, i) =>
          <option key={i} value={i + 1}>{i + 1}</option>
        )}
      </select>
    );
  }

  renderYears() {
    let year = (new Date()).getFullYear();
    var years = [], limit = year - 150;
    while (year >= limit) years.push(year--);

    return (
      <select name="year" className="form-control ml-2 autoWidth" onChange={this.handleChange}>
        <option value="">(Year)</option>
        {years.map((year, i) =>
          <option key={i} value={year}>{year}</option>
        )}
      </select>
    );
  }

  isValidDate = (dateString) => {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    let value = target.value;

    let date = "";

    let year = this.state.year ? this.state.year : '';
    let month = this.state.month ? this.state.month : '';
    let day = this.state.day ? this.state.day : '';
    
    switch(name) {
      case 'year': {
        year = value !== "" ? value : "";
        break;
      }
      case 'month': {
        month = value !== "" ? value : "";
        break;
      }
      case 'day': {
        day = value !== "" ? value : "";
        break;
      }
      default: {
        break;
      }
    }
    
    month = month !== "" ? ('0' + month).slice(-2) : month;
    day = day !== "" ? ('0' + month).slice(-2) : day;

    date = year + '-' + month + '-' + day;
    date = date === "--" ? "" : date;
    
    if (date !== "" && !this.isValidDate(date)) {
      this.setState({ 
        [name]: value,
        error: true,
        errorMessage: "Please enter valid date"
      });
    }
    else {
      this.setState({
        [name]: value ,
        error: false,
        errorMessage: ""
      });
    }
      
    if (this.props.onChange) this.props.onChange(null, { name: 'dob', value: date });
  }

  render() {
    return (
      <div className="form-group relative">
        <label>Date of Birth <em>(optional)</em></label>
        <div className="inline" ref={ref => this.inputRef = ref} data-tip="" data-for={this.props.name} data-event="click" data-event-off="dblclick">
          {this.renderMonths()}
          {this.renderDays()}
          {this.renderYears()}
        </div>
        <ReactTooltip id={this.props.name} type='error' effect='solid' scrollHide={false} resizeHide={false}>
          {
            // After Register button clicked
            this.props.showTooltip
            ? this.props.required && this.state.value === ''
              ? <span>{this.props.placeholder} is required</span>
              : this.state.error
                ? <span>{this.state.errorMessage}</span> 
                : this.props.error
                  ? <span>{ this.props.errorMessage }</span>
                  : null
            : null
          }
        </ReactTooltip>
      </div>
    )
  }
}

export default DateInput;