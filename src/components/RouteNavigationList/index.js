import {Component} from 'react'
import ThemContext from '../../context/ThemContext'
import RouteItems from '../Header/RouteItems'
import {NavModelBg, UnList} from './styledComponent'
import './index.css'

const routesList = [
  {
    routeId: 'home',
    displayText: 'Home',
  },
  {
    routeId: 'trending',
    displayText: 'Trending',
  },
  {
    routeId: 'gaming',
    displayText: 'Gaming',
  },
  {
    routeId: 'saved-videos',
    displayText: 'Saved videos',
  },
]

class RouteNavigationList extends Component {
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       activeRoute: routesList[0].routeId,
  //     }
  //   }

  //   changeActiveRoute = id => {
  //     this.setState({activeRoute: id})
  //   }

  renderRouteItemsList = (isDark, activeRoute, changeActiveRoute) => (
    <UnList isDark={isDark}>
      {routesList.map(each => (
        <RouteItems
          key={each.routeId}
          routeDetails={each}
          isDark={isDark}
          isActive={activeRoute === each.routeId}
          changeActiveRoute={changeActiveRoute}
        />
      ))}
    </UnList>
  )

  render() {
    return (
      <ThemContext.Consumer>
        {value => {
          const {isDark, activeRoute, changeActiveRoute} = value

          return (
            <NavModelBg isDark={isDark}>
              {this.renderRouteItemsList(
                isDark,
                activeRoute,
                changeActiveRoute,
              )}
            </NavModelBg>
          )
        }}
      </ThemContext.Consumer>
    )
  }
}

export default RouteNavigationList
