import React from 'react';

class LoginFooter extends React.Component {
  constructor() {
    super()
    this.state = { value: '' };
  }

  goToLogin = () => {
    window.location = "/login";
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-12 login">
          <button className="btn btn-primary btn-lg btn-block" onClick={this.goToLogin}>Login</button>
        </div>
      </div>
    )
  }
}

export default LoginFooter;