import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

// import {GrLike} from 'react-icons/gr'

// import { GrLike } from "react-icons/gr";
// import {BiLike} from 'react-icons/bi'

import {BiListPlus, BiLike, BiDislike} from 'react-icons/bi'

import ThemContext from '../../context/ThemContext'
import Header from '../Header'
import SideNavigator from '../SideNavigator'

import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import {Body} from '../Home/styledComponent'
import {Title} from '../HomeVideoItem/styledComponent'
import {LikeButton, DislikeButton, SaveButton, CName} from './styledComponent'
import './index.css'
import {TrendingBg} from '../TrendingRoute/styledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetailsRoute extends Component {
  state = {
    apiStatus: false,
    videoDetails: {},
  }

  componentDidMount() {
    this.getVideo()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
  })

  getVideo = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.video_details)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSaveOrDeleteVideo = () => {}

  renderSuccessView = () => {
    const {videoDetails} = this.state
    const {
      id,
      title,
      videoUrl,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoDetails
    const {name, profileImageUrl, subscriberCount} = channel
    console.log(videoDetails)
    return (
      <ThemContext.Consumer>
        {value => {
          const {
            isDark,
            savedVideos,
            saveOrDeleteVideo,
            likedVideos,
            dislikedVideos,
            changeLike,
            changeDislike,
          } = value
          console.log(savedVideos)

          const isPresent = savedVideos.some(object => object.id === id)
          const isLiked = likedVideos.some(object => object.id === id)
          const isDisliked = dislikedVideos.some(object => object.id === id)
          const saveText = isPresent ? 'Saved' : 'Save'
          const onSaveOrDeleteVideo = () => {
            saveOrDeleteVideo({
              id,
              title,
              thumbnailUrl,
              channel,
              viewCount,
              publishedAt,
            })
          }
          const onClickLike = () => {
            changeLike({id})
          }
          const onClickDislike = () => {
            changeDislike({id})
          }

          return (
            <>
              <div className="react-player-bg">
                <ReactPlayer
                  url={videoUrl}
                  controls
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              </div>
              <div className="video-content">
                <Title isDark={isDark}>{title}</Title>
                <div className="views-likes-bg">
                  <div className="flex-row views-bg">
                    <p className="para">{viewCount}</p>
                    <BsDot className="para size-large" />
                    <p className="para">
                      {formatDistanceToNow(new Date(publishedAt))} ago
                    </p>
                  </div>
                  <div className="likes-bg">
                    <LikeButton
                      isLiked={isLiked}
                      like
                      type="button"
                      onClick={onClickLike}
                    >
                      Like
                      <BiLike />
                    </LikeButton>
                    <DislikeButton
                      isDisliked={isDisliked}
                      like
                      type="button"
                      onClick={onClickDislike}
                    >
                      <BiDislike />
                      Dislike
                    </DislikeButton>
                    <SaveButton
                      like
                      isPresent={isPresent}
                      type="button"
                      onClick={onSaveOrDeleteVideo}
                    >
                      <BiListPlus /> {saveText}
                    </SaveButton>
                  </div>
                </div>
                <hr />
                <div className="profile-bg">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="profile"
                  />
                  <div className="channel-bg">
                    <CName isDark={isDark}>{name}</CName>
                    <p className="para">{subscriberCount} subscribers</p>
                  </div>
                </div>
                <CName isDark={isDark}>{description}</CName>
              </div>
            </>
          )
        }}
      </ThemContext.Consumer>
    )
  }

  renderAllOutputView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <LoaderView retry={this.retry} />
      case apiStatusConstants.success:
        return this.renderSuccessView()
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
                <TrendingBg isDark={isDark} data-testid="videoItemDetails">
                  {this.renderAllOutputView()}
                </TrendingBg>
              </Body>
            </>
          )
        }}
      </ThemContext.Consumer>
    )
  }
}

export default VideoItemDetailsRoute
