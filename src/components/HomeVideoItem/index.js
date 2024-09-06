import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

import ThemContext from '../../context/ThemContext'
import {VideoItem, Title} from './styledComponent'

import './index.css'

const HomeVideoItem = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
  const {profileImageUrl, name} = channel
  return (
    <ThemContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <VideoItem isDark={isDark}>
            <Link to={`/videos/${id}`} className="link">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail"
              />
              <div className="profile-title-bg">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profile"
                />
                <div className="title-container">
                  <Title isDark={isDark}>{title}</Title>
                  <div className="channel-views-pub-bg flex-row sm-flex-wrap">
                    <p className="para f-grow">{name}</p>
                    <BsDot className="para size-large d-none" />
                    <p className="para">{viewCount}</p>
                    <BsDot className="para size-large" />
                    <p className="para">
                      {formatDistanceToNow(new Date(publishedAt))} ago
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </VideoItem>
        )
      }}
    </ThemContext.Consumer>
  )
}

export default HomeVideoItem
