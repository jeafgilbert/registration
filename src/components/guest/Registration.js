import React from 'react';
import TextInput from '../form/TextInput';
import DateInput from '../form/DateInput';
import Footer from '../Footer';
import LoginFooter from '../LoginFooter';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobileExists: false,
      isEmailExists: false,
      submitting: false,
      isSignedUp: false
    }
  }

  handleChange = (event, childObject) => {
    let name, value;

    if (!event && childObject) {
      name = childObject.name;
      value = childObject.value;
    }
    else {
      const target = event.target;
      value = target.value;
      name = target.name;
    }

    this.setState({
      [name]: value
    });
  }

  isValidDate = (dateString) => {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
  }

  register = (event) => {
    event.preventDefault();

    // Init
    let regex = "";

    // Do this to show error tooltips
    this.setState({
      submitting: true
    });

    // Validate all fields in state
    // console.log(this.state);

    // Mobile is empty
    if (!this.state.mobile || this.state.mobile === "") {
      return;
    }
    else {
      // Validate Mobile Number
      regex = /^((?:\+62|62)|0)[2-9]{1}[0-9]+$/g;

      // Invalid Mobile Number
      if (!this.state.mobile.match(regex)) {
        return;
      }
    }

    // First Name is empty
    if (!this.state.firstName || this.state.firstName === "") {
      return;
    }

    // Last Name is empty
    if (!this.state.lastName || this.state.lastName === "") {
      return;
    }

    // Validate DOB (optional)
    if (this.state.dob && this.state.dob !== "" && !this.isValidDate(this.state.dob)) {
      return;
    }

    // No validation for Gender

    // Email is empty
    if (!this.state.email || this.state.email === "") {
      return;
    }
    else {
      // Validate email address
      regex = /\S+@\S+\.\S+/;

      // Invalid Email Address
      if (!this.state.email.match(regex)) {
        return;
      }
    }

    // Disable form 
    this.setState({
      isLoading: true
    });

    // AJAX registration
    // You might want to change this API URL for testing
    fetch("https://jeafgilbert.com/registration_api/users/create.php", {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify({
        mobile: this.state.mobile,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.dob,
        gender: this.state.gender,
        email: this.state.email
      }),
    })
      .then(res => res.json())
      .then((result) => {
        // console.log(result);
        if (result.isMobileExists) {
          // Mobile number already exists
          this.setState({
            isLoading: false,
            errorMobile: true,
            errorMobileMessage: "Mobile number already exists"
          });
        }
        else {
          this.setState({
            errorMobile: false,
            errorMobileMessage: ""
          });
        }

        if (result.isEmailExists) {
          // Email already exists
          this.setState({
            isLoading: false,
            errorEmail: true,
            errorEmailMessage: "Email already exists"
          });
        }
        else {
          this.setState({
            errorEmail: false,
            errorEmailMessage: ""
          });
        }

        // SUCCEEDED!
        if (result.isSucceeded) {
          this.setState({
            isSignedUp: true
          });
        }

        // Succeeded, show Login button
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          // Mobile number already exists
          // alert("Error occured, please try again later");
        }
      );
  }

  render() {
    return (
      <div className="App fullHeight">
        <div className="container-fluid fullHeight">
          <div className="row no-gutters align-items-center justify-content-center fullHeight">
            <div className="col-xl-6 col-md-8 guestBox">
              <div className="row relative">
                <div className="col-xl-12 content">
                  <form>
                    <h1>Registration</h1>
                    <br />
                    <TextInput showTooltip={this.state.submitting} name="mobile" placeholder="Mobile number" onChange={this.handleChange} required={true} mask="phoneIndonesia" error={this.state.errorMobile ? true : false} errorMessage={this.state.errorMobileMessage ? this.state.errorMobileMessage : ""} />
                    <TextInput showTooltip={this.state.submitting} name="firstName" placeholder="First name" onChange={this.handleChange} required={true} />
                    <TextInput showTooltip={this.state.submitting} name="lastName" placeholder="Last name" onChange={this.handleChange} required={true} />
                    <DateInput showTooltip={this.state.submitting} name="dob" placeholder="Date of birth" onChange={this.handleChange} />
                    <div className="form-group">
                      <label>Gender <em>(optional)</em></label>
                      <div className="inline">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="gender-male" name="gender" value="m" className="custom-control-input" onChange={this.handleChange} />
                          <label className="custom-control-label" htmlFor="gender-male">Male</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input type="radio" id="gender-female" name="gender" value="f" className="custom-control-input" onChange={this.handleChange} />
                          <label className="custom-control-label" htmlFor="gender-female">Female</label>
                        </div>
                      </div>
                    </div>
                    <TextInput showTooltip={this.state.submitting} name="email" type="email" placeholder="Email" onChange={this.handleChange} required={true} mask="email" error={this.state.errorEmail ? true : false} errorMessage={this.state.errorEmailMessage ? this.state.errorEmailMessage : ""} />
                    <button className="btn btn-primary btn-lg btn-block" onClick={this.register}>Register</button>
                  </form >
                </div>
                {
                  !this.state.isLoading
                    ? null
                    : <div className="greyOverlay"></div>
                }
              </div >
              {
                !this.state.isSignedUp
                  ? <Footer />
                  : <LoginFooter />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Registration;