import React from 'react';

class RegisterFooter extends React.Component {
  constructor() {
    super()
    this.state = { value: '' };
  }

  goToRegistration = () => {
    window.location = "/";
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-12 login">
          <button className="btn btn-primary btn-lg btn-block" onClick={this.goToRegistration}>Register</button>
        </div>
      </div>
    )
  }
}

export default RegisterFooter;