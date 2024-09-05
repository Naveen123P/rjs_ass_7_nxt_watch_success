import Header from '../Header'
import SideNavigator from '../SideNavigator'
import ThemContext from '../../context/ThemContext'
import {Heading} from '../ContactUs/styledComponent'
import {Para} from '../Header/RouteItems/styledComponent'
import './index.css'
import {Body, ContentBg, HomeBg} from '../Home/styledComponent'

const NotFound = () => {
  const renderNotFound = isDark => {
    const notFoundImg = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
    return (
      <div className="failure-bg">
        <img src={notFoundImg} alt="not found" className="on-videos-img" />
        <Heading isDark={isDark}>Page Not Found</Heading>
        <Para isDark={isDark}>
          We are sorry, the page you requested could not be found.
        </Para>
      </div>
    )
  }

  return (
    <ThemContext.Consumer>
      {value => {
        const {isDark} = value

        return (
          <>
            <Header />
            <Body isDark={isDark} className="flex-row">
              <SideNavigator />
              <ContentBg>
                {/* <PremiumBox /> */}
                <HomeBg isDark={isDark}>{renderNotFound(isDark)}</HomeBg>
              </ContentBg>
            </Body>
          </>
        )
      }}
    </ThemContext.Consumer>
  )
}

export default NotFound
