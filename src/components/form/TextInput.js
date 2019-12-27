import React from 'react';
import ReactTooltip from 'react-tooltip';

class TextInput extends React.Component {
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

  handleChange = (event) => {
    let error = false;
    let errorMessage = "";
    let value = event.target.value;

    if (this.props.mask) {
      switch (this.props.mask) {
        case 'phoneIndonesia': {
          const regex = /^((?:\+62|62)|0)[2-9]{1}[0-9]+$/g;

          // Remove whitespaces and hypens
          value = value.replace(/[\s-]+/g, '');
          if (!value.match(regex)) {
            error = true;
            errorMessage = "Please enter valid Indonesian phone number";
          }

          break;
        }
        case 'email': {
          const regex = /\S+@\S+\.\S+/;

          // Remove whitespaces
          value = value.replace(/[\s]+/g, '');
          if (!value.match(regex)) {
            error = true;
            errorMessage = "Please enter valid email address";
          }

          break;
        }
        default: {
          break;
        }
      }
    }

    this.setState({ 
      value: value,
      error: error,
      errorMessage: errorMessage
    });

    // Run parent's event
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <div className="form-group relative">
        { /* by setting data-tip to empty string, prevent showing tooltip if ReactTooltip children is null, otherwise will showing 'true' string */ }
        { /* data-event-off only makes effect after setting data-event */ }
        <input type={this.props.type ? this.props.type : 'text'} name={this.props.name ? this.props.name : ''} className="form-control" value={this.state.value} onChange={this.handleChange} ref={ref => this.inputRef = ref} data-tip="" data-for={this.props.name} data-event="click" data-event-off="click" />
        {this.state.value === ''
          ? <span className="floatingLabel">{this.props.placeholder}</span>
          : <span className="floatingLabel fixed">{this.props.placeholder}</span>}
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
    );
  }
}

export default TextInput;