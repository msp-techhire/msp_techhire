import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('landing');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <div id="loginPhotoCity"></div>
        <div className="wrapperGridLogin">
          <div id="logoLogin"></div>
          <form onSubmit={this.login} className="logInForm">
            <h1 id="textLogin">Login</h1>
            <div>
              <label htmlFor="username" id="textUsername">
                Username:
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  className="logInInput"
                  onChange={this.handleInputChangeFor('username')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password" id="textPassword">
                Password:
              <input
                  type="password"
                  name="password"
                  className="logInInput"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
              </label>
            </div>
            <div>
              <input
                type="submit"
                name="submit"
                value="Log In"
              />
              {/* <Link to="/register">Register</Link> */}
            </div>
          </form>
        </div>
        <div id="photoPathwayLoginPage"></div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
