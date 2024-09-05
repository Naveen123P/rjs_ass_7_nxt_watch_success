import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ThemContext from './context/ThemContext'
import Home from './components/Home'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import './App.css'

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

class App extends Component {
  state = {
    isDark: false,
    displayPremiumBox: true,
    savedVideos: [],
    likedVideos: [],
    dislikedVideos: [],
    activeRoute: routesList[0].routeId,
  }

  changeThem = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  closePremiumBox = () => {
    this.setState({displayPremiumBox: false})
  }

  saveOrDeleteVideo = newVideo => {
    const {savedVideos} = this.state
    let isPresent
    if (savedVideos.length === 0) {
      isPresent = false
    } else {
      isPresent = savedVideos.some(object => object.id === newVideo.id)
    }
    if (isPresent) {
      const filteredSavedVideos = savedVideos.filter(
        each => each.id !== newVideo.id,
      )
      this.setState({savedVideos: filteredSavedVideos})
    } else {
      this.setState(prevState => ({
        savedVideos: [newVideo, ...prevState.savedVideos],
      }))
    }
  }

  changeLike = videoId => {
    const {likedVideos, dislikedVideos} = this.state

    const isExist = likedVideos.some(each => each.id === videoId.id)

    if (isExist) {
      const filteredLikedVideos = likedVideos.filter(
        each => each.id !== videoId.id,
      )
      this.setState({
        likedVideos: filteredLikedVideos,
        dislikedVideos: [videoId, ...dislikedVideos],
      })
    } else {
      const filteredDisLikedVideos = dislikedVideos.filter(
        each => each.id !== videoId.id,
      )
      this.setState({
        likedVideos: [videoId, ...likedVideos],
        dislikedVideos: filteredDisLikedVideos,
      })
    }
  }

  changeDislike = videoId => {
    const {likedVideos, dislikedVideos} = this.state

    const isExist = dislikedVideos.some(each => each.id === videoId.id)

    if (isExist) {
      const filteredDisLikedVideos = dislikedVideos.filter(
        each => each.id !== videoId.id,
      )
      this.setState({
        dislikedVideos: filteredDisLikedVideos,
        likedVideos: [videoId, ...dislikedVideos],
      })
    } else {
      const filteredLikedVideos = likedVideos.filter(
        each => each.id !== videoId.id,
      )
      this.setState({
        dislikedVideos: [videoId, ...dislikedVideos],
        likedVideos: filteredLikedVideos,
      })
    }
  }

  changeActiveRoute = id => {
    this.setState({activeRoute: id})
  }

  render() {
    const {
      isDark,
      displayPremiumBox,
      savedVideos,
      likedVideos,
      dislikedVideos,
      activeRoute,
    } = this.state
    return (
      <ThemContext.Provider
        value={{
          isDark,
          displayPremiumBox,
          savedVideos,
          likedVideos,
          dislikedVideos,
          activeRoute,
          changeActiveRoute: this.changeActiveRoute,
          changeLike: this.changeLike,
          changeDislike: this.changeDislike,
          saveOrDeleteVideo: this.saveOrDeleteVideo,
          changeThem: this.changeThem,
          closePremiumBox: this.closePremiumBox,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemContext.Provider>
    )
  }
}

export default App
