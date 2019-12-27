import React from 'react';

class Footer extends React.Component {
  constructor() {
    super()
    this.state = { value: '' };
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-12 footer">
          by Jeaf Gilbert <small>(Dec 2019)</small>
        </div>
      </div>
    )
  }
}

export default Footer;