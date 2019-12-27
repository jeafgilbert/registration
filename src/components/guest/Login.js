import React from 'react';
import TextInput from '../form/TextInput';
import RegisterFooter from '../RegisterFooter';

class Login extends React.Component {
  render() {
    return (
      <div className="App fullHeight">
        <div className="container-fluid fullHeight">
          <div className="row no-gutters align-items-center justify-content-center fullHeight">
            <div className="col-xl-6 col-md-8 guestBox">
              <div className="row relative">
                <div className="col-xl-12 content">
                  <form>
                    <h1>Login</h1>
                    <br />
                    <TextInput name="mobile" placeholder="Mobile number" />
                    <TextInput name="email" placeholder="Email" />
                    <button className="btn btn-primary btn-lg btn-block">Login</button>
                  </form >
                </div>
              </div >
              <RegisterFooter />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;