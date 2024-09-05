import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'

import ThemContext from '../../context/ThemContext'
import Header from '../Header'
import SideNavigator from '../SideNavigator'
import PremiumBox from '../PremiumBox'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import GamingVideoItem from '../GamingVideoItem'
import NoSearchResultView from '../NoSearchResultView'
import {Body, ContentBg, HomeBg} from '../Home/styledComponent'
import {
  TrendHeadBg,
  TrendIconBg,
  TrendHeading,
} from '../TrendingRoute/styledComponent'
import {UnGameVideosList} from './styledComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    responseVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
  })

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => this.getFormattedData(each))
      this.setState({
        responseVideos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = isDark => {
    const {responseVideos} = this.state

    return (
      <>
        {responseVideos.length === 0 ? (
          <NoSearchResultView retry={this.retry} />
        ) : (
          <UnGameVideosList isDark={isDark}>
            {responseVideos.map(each => (
              <GamingVideoItem key={each.id} videoDetails={each} />
            ))}
          </UnGameVideosList>
        )}
      </>
    )
  }

  retry = () => {
    this.getGamingVideos()
  }

  renderAllOutputView = isDark => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView retry={this.retry} />
      case apiStatusConstants.success:
        return this.renderSuccessView(isDark)
      case apiStatusConstants.failure:
        return <FailureView retry={this.retry} />
      default:
        return null
    }
  }

  render() {
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
                  <PremiumBox />
                  <HomeBg isDark={isDark}>
                    <TrendHeadBg isDark={isDark}>
                      <TrendIconBg isDark={isDark}>
                        <FaFire className="fire-icon" />
                      </TrendIconBg>
                      <TrendHeading isDark={isDark}>Gaming</TrendHeading>
                    </TrendHeadBg>
                    {this.renderAllOutputView(isDark)}
                  </HomeBg>
                </ContentBg>
              </Body>
            </>
          )
        }}
      </ThemContext.Consumer>
    )
  }
}

export default GamingRoute
