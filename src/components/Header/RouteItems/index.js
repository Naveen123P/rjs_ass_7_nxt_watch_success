import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import {ListItem, IconContainer, Para} from './styledComponent'

import './index.css'

const RouteItems = props => {
  const {routeDetails, isDark, isActive, changeActiveRoute} = props
  const {routeId, displayText} = routeDetails

  const renderRouteIcon = () => {
    switch (routeId) {
      case 'home':
        return <IoMdHome />
      case 'trending':
        return <FaFire />
      case 'gaming':
        return <SiYoutubegaming />
      case 'saved-videos':
        return <BiListPlus />
      default:
        return null
    }
  }

  const path = () => {
    if (routeId === 'home') {
      return ''
    }
    return routeId
  }

  const onChangeActiveRoute = () => {
    changeActiveRoute(routeId)
  }

  return (
    <ListItem isDark={isDark} isActive={isActive}>
      <Link to={`/${path()}`} className="link">
        <button
          type="button"
          className="route-button"
          onClick={onChangeActiveRoute}
        >
          <IconContainer
            isDark={isDark}
            isActive={isActive}
            className="route-icon"
          >
            {renderRouteIcon()}
          </IconContainer>
          <Para isDark={isDark} isActive={isActive}>
            {displayText}
          </Para>
        </button>
      </Link>
    </ListItem>
  )
}

export default RouteItems
