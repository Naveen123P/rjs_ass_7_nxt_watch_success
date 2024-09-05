import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSearch} from 'react-icons/md'

import ThemContext from '../../context/ThemContext'
import Header from '../Header'
import SideNavigator from '../SideNavigator'
import PremiumBox from '../PremiumBox'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import HomeVideoItem from '../HomeVideoItem'
import NoSearchResultView from '../NoSearchResultView'

import {
  Body,
  ContentBg,
  HomeBg,
  SearchInputContainer,
  SearchInput,
  SearchButton,
  UnHomeVideosList,
} from './styledComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    responseVideos: [],
  }

  componentDidMount() {
    this.getSearchItems()
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

  getSearchItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchText}`
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
              <HomeVideoItem key={each.id} videoDetails={each} />
            ))}
          </UnHomeVideosList>
        )}
      </>
    )
  }

  onChangeSearchInput = event => {
    if (event.keyDown === 'enter') {
      this.getSearchItems()
    }
    this.setState({searchText: event.target.value})
  }

  renderSearchInput = isDark => {
    const {searchText} = this.state

    return (
      <SearchInputContainer isDark={isDark}>
        <SearchInput
          isDark={isDark}
          type="search"
          value={searchText}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <SearchButton
          isDark={isDark}
          type="button"
          onClick={this.getSearchItems}
          data-testid="searchButton"
        >
          <MdSearch />{' '}
        </SearchButton>
      </SearchInputContainer>
    )
  }

  retry = () => {
    this.getSearchItems()
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
                <ContentBg isDark={isDark} data-testid="home">
                  <PremiumBox />
                  <HomeBg isDark={isDark}>
                    {this.renderSearchInput(isDark)}
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

export default Home
