import {FaFire} from 'react-icons/fa'
import ThemContext from '../../context/ThemContext'
import TrendVideoItem from '../TrendVideoItem'

import Header from '../Header'
import SideNavigator from '../SideNavigator'
import PremiumBox from '../PremiumBox'
import {
  Body,
  ContentBg,
  HomeBg,
  UnHomeVideosList,
} from '../Home/styledComponent'
import {
  TrendHeadBg,
  TrendIconBg,
  TrendHeading,
} from '../TrendingRoute/styledComponent'
import './index.css'

import {} from './styledComponent'
import {Heading} from '../ContactUs/styledComponent'
import {Para} from '../Header/RouteItems/styledComponent'

const SavedVideosRoute = () => {
  const renderSuccessView = (isDark, savedVideosList) => (
    <>
      <UnHomeVideosList isDark={isDark}>
        {savedVideosList.map(each => (
          <TrendVideoItem key={each.id} videoDetails={each} />
        ))}
      </UnHomeVideosList>
    </>
  )

  const noSearchView = isDark => (
    <div className="failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        className="on-videos-img"
      />
      <Heading isDark={isDark}>No saved videos found</Heading>
      <Para isDark={isDark}>You can save your videos while watching them</Para>
    </div>
  )

  return (
    <ThemContext.Consumer>
      {value => {
        const {isDark, savedVideos} = value

        return (
          <>
            <Header />
            <Body isDark={isDark} className="flex-row">
              <SideNavigator />
              <ContentBg>
                <PremiumBox />
                <HomeBg isDark={isDark}>
                  <TrendHeadBg isDark={isDark}>
                    <TrendIconBg isDark={isDark}>
                      <FaFire className="fire-icon" />
                    </TrendIconBg>
                    <TrendHeading isDark={isDark}>Saved Videos</TrendHeading>
                  </TrendHeadBg>
                  {savedVideos.length === 0 ? (
                    <>{noSearchView(isDark)}</>
                  ) : (
                    <>{renderSuccessView(isDark, savedVideos)}</>
                  )}
                </HomeBg>
              </ContentBg>
            </Body>
          </>
        )
      }}
    </ThemContext.Consumer>
  )
}

export default SavedVideosRoute
