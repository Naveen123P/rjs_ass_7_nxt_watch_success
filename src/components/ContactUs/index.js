import ThemContact from '../../context/ThemContext'
import {Para} from './styledComponent'
import './index.css'

const ContactUs = () => (
  <ThemContact.Consumer>
    {value => {
      const {isDark} = value
      return (
        <div>
          <Para isDark={isDark}>CONTACT US</Para>
          <div className="images-container flex-row">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
              className="logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
              className="logo"
            />
          </div>
          <Para isDark={isDark}>
            Enjoy! Now to see your channels and recommendations!
          </Para>
        </div>
      )
    }}
  </ThemContact.Consumer>
)

export default ContactUs
