import React from 'react'

const ThemContext = React.createContext({
  isDark: '',
  displayPremiumBox: '',
  savedVideos: [],
  likedVideos: [],
  dislikedVideos: [],
  changeLike: () => {},
  changeDislike: () => {},
  saveOrDeleteVideo: () => {},
  closePremiumBox: () => {},
  changeThem: () => {},
  activeRoute: '',
  changeActiveRoute: () => {},
})

export default ThemContext
