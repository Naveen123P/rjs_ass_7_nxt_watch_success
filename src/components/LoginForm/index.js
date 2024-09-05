import {Component} from 'react'
import Cookies from 'js-cookie'
import ThemContext from '../../context/ThemContext'
import {
  LoginBg,
  LoginContainer,
  Label,
  Input,
  CLabel,
  LoginButton,
} from './styledComponent'
import './index.css'

class LoginForm extends Component {
  state = {
    isChecked: false,
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onsubmitFailure = errorMsg => {
    this.setState({
      showSubmitError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onsubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsername = isDark => {
    const {username} = this.state
    return (
      <div className="input-container">
        <Label isDark={isDark} htmlFor="username">
          USERNAME
        </Label>
        <Input
          isEmpty={username.length === 0}
          type="text"
          isDark={isDark}
          value={username}
          id="username"
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = isDark => {
    const {password, isChecked} = this.state
    const inputType = isChecked ? 'text' : 'password'
    return (
      <div className="input-container">
        <Label isDark={isDark} htmlFor="password">
          PASSWORD
        </Label>
        <Input
          isEmpty={password.length === 0}
          type={inputType}
          isDark={isDark}
          value={password}
          id="password"
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {isChecked, showSubmitError, errorMsg} = this.state
    return (
      <ThemContext.Consumer>
        {value => {
          const {isDark} = value
          const logoImg = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <LoginBg isDark={isDark}>
              <LoginContainer isDark={isDark}>
                <img
                  src={logoImg}
                  alt="website logo"
                  className="form-website-logo"
                />
                <form onSubmit={this.onSubmitForm}>
                  {this.renderUsername(isDark)}
                  {this.renderPassword(isDark)}
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={isChecked}
                      id="checkbox"
                      className="checkbox-input"
                      onChange={this.onClickCheckBox}
                    />
                    <CLabel htmlFor="checkbox" isDark={isDark}>
                      Show Password
                    </CLabel>
                  </div>
                  <LoginButton type="submit">Login</LoginButton>
                  {showSubmitError && (
                    <p className="show-error-mag">*{errorMsg}</p>
                  )}
                </form>
              </LoginContainer>
            </LoginBg>
          )
        }}
      </ThemContext.Consumer>
    )
  }
}

export default LoginForm
