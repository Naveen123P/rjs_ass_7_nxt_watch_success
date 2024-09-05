import {Link} from 'react-router-dom'

import ThemContext from '../../context/ThemContext'
import {ListItem} from './styledComponent'

// import {ListItem} from '../Header/RouteItems/styledComponent'
import {Title} from '../HomeVideoItem/styledComponent'
import './index.css'

const GamingVideoItem = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  return (
    <ThemContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <ListItem isDark={isDark}>
            <Link to={`/videos/${id}`} className="link">
              <div className="game-div">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className=" gaming-thumbnail"
                />
                <div className="profile-title-bg gaming-profile-title-bg">
                  <div className="title-container">
                    <Title isDark={isDark}>{title}</Title>
                    <div className="channel-views-pub-bg flex-row sm-flex-wrap">
                      <p className="para">{viewCount} Watching Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </ListItem>
        )
      }}
    </ThemContext.Consumer>
  )
}

export default GamingVideoItem
