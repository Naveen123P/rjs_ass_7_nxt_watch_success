import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'

import ThemContext from '../../context/ThemContext'
import TrendVideoItem from '../TrendVideoItem'
import Header from '../Header'
import SideNavigator from '../SideNavigator'
import PremiumBox from '../PremiumBox'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import NoSearchResultView from '../NoSearchResultView'

import {
  Body,
  ContentBg,
  HomeBg,
  UnHomeVideosList,
} from '../Home/styledComponent'

import {TrendHeadBg, TrendIconBg, TrendHeading} from './styledComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    responseVideos: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
  })

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
          <UnHomeVideosList isDark={isDark}>
            {responseVideos.map(each => (
              <TrendVideoItem key={each.id} videoDetails={each} />
            ))}
          </UnHomeVideosList>
        )}
      </>
    )
  }

  retry = () => {
    this.getTrendingVideos()
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
                      <TrendHeading isDark={isDark}>Trending</TrendHeading>
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

export default TrendingRoute
