import RouteNavigationList from '../RouteNavigationList'
import ThemContext from '../../context/ThemContext'
import ContactUs from '../ContactUs'
import {SideContainer} from './styledComponent'
import './index.css'

const SideNavigator = () => (
  <ThemContext.Consumer>
    {value => {
      const {isDark} = value

      return (
        <SideContainer isDark={isDark} className="side-navigator-container">
          <RouteNavigationList />
          <ContactUs />
        </SideContainer>
      )
    }}
  </ThemContext.Consumer>
)

export default SideNavigator
