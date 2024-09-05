import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {MdLightbulbOutline} from 'react-icons/md'
import {IoMdMoon} from 'react-icons/io'
import {IoReorderThreeSharp} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import RouteNavigationList from '../RouteNavigationList'
import ThemContext from '../../context/ThemContext'
import {
  HeaderBg,
  ItemsContainer,
  Button,
  MobileButton,
  DesktopButton,
  LogoutModelBg,
  Para,
  ConformButton,
  CancelButton,
} from './styledComponent'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderDesktopLogoutButton = isDark => (
    <Popup
      modal
      trigger={
        <DesktopButton isDark={isDark} type="button">
          Logout
        </DesktopButton>
      }
      //   position="right-bottom"
    >
      {close => (
        <LogoutModelBg isDark={isDark}>
          <Para isDark={isDark}>Are you sure, want to logout ?</Para>
          <div className="flex-row">
            <CancelButton isDark={isDark} type="button" onClick={() => close()}>
              Cancel
            </CancelButton>
            <ConformButton type="button" onClick={this.onClickLogout}>
              Conform
            </ConformButton>
          </div>
        </LogoutModelBg>
      )}
    </Popup>
  )

  renderMobileLogoutButton = isDark => (
    <Popup
      modal
      trigger={
        <MobileButton isDark={isDark} type="button">
          <FiLogOut />{' '}
        </MobileButton>
      }
      //   position="right-bottom"
    >
      {close => (
        <LogoutModelBg isDark={isDark}>
          <Para isDark={isDark}>Are you sure, you want to logout</Para>
          <div className="flex-row">
            <CancelButton isDark={isDark} type="button" onClick={() => close()}>
              Cancel
            </CancelButton>
            <ConformButton type="button" onClick={this.onClickLogout}>
              Confirm
            </ConformButton>
          </div>
        </LogoutModelBg>
      )}
    </Popup>
  )

  renderNavigationView = isDark => (
    <Popup
      model
      trigger={
        <Button isDark={isDark} type="button">
          <IoReorderThreeSharp />{' '}
        </Button>
      }
      position="bottom"
    >
      <RouteNavigationList dummy="dummy" />
    </Popup>
  )

  renderThemItem = (isDark, changeThem) => {
    const onChangeThem = () => {
      changeThem()
    }
    return (
      <div className="them-icon-bg">
        {isDark ? (
          <Button
            type="button"
            isDark={isDark}
            onClick={onChangeThem}
            data-testid="theme"
          >
            <MdLightbulbOutline />{' '}
          </Button>
        ) : (
          <Button
            type="button"
            isDark={isDark}
            onClick={onChangeThem}
            data-testid="theme"
          >
            <IoMdMoon />{' '}
          </Button>
        )}
      </div>
    )
  }

  render() {
    return (
      <ThemContext.Consumer>
        {value => {
          const {isDark, changeThem} = value
          const logoImg = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <HeaderBg isDark={isDark}>
              <Link to="/">
                <img
                  src={logoImg}
                  alt="website logo"
                  className="nxt-watch-logo"
                />
              </Link>
              <ItemsContainer isDark={isDark}>
                {this.renderThemItem(isDark, changeThem)}
                <div className="mobile-popup-navigation">
                  {this.renderNavigationView(isDark)}
                </div>
                <div className="profile-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                  />
                </div>
                <div className="mobile-logout">
                  {this.renderMobileLogoutButton(isDark)}
                </div>
                <div className="desktop-logout">
                  {this.renderDesktopLogoutButton(isDark)}
                </div>
              </ItemsContainer>
            </HeaderBg>
          )
        }}
      </ThemContext.Consumer>
    )
  }
}

export default withRouter(Header)
