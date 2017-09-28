import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const {Component} = React;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {status: ''};
  }

  componentWillMount() {
    axios.get('/status').then((res) => {
      this.setState({status: res.data.status});
      console.log(this.state.status);
    });
  }

lights() {
    axios.post('/light').then((res) => {
      console.log(res.data.status);
      this.setState({status: res.data.status});
      console.log(this.state.status);
  });
}

  render() {
    if (this.state.status === '') {
      console.log(this.state);
      return <h2>Connecting...</h2>
    } else if (this.state.status === 'off') {
      return (
        <div className="row">
          <div className="row s12">
            <Link to="#" onClick={() => {this.lights();}} className="col s12 waves-effect waves-light btn-large green"><i className="material-icons center">brightness_high</i></Link>
          </div>
        </div>
      );
    } else if (this.state.status === 'on') {
      return (
      <div className="row">
        <div className="row s12">
          <Link to="#" onClick={() => {this.lights();}} className="col s12 waves-effect waves-light btn-large red"><i className="material-icons center">brightness_1</i></Link>
        </div>
      </div>
    )
    }
  }
}

module.exports = App;
