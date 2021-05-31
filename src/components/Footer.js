import React from 'react';
import './../styles/Footer.css'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='social-networks'>
          <h1>Ми у соцмережах</h1>
          <a href="https://www.instagram.com/">
            <img alt="instagram" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-256.png" />
          </a>
          <a href="https://uk-ua.facebook.com/">
            <img alt="facebook" src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_facebook-256.png" />
          </a>
          <a href="https://twitter.com/?lang=uk">
            <img alt="twitter" src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/twitter-256.png" />
          </a>
          <a href="https://www.pinterest.com/">
            <img alt="pinterest" src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Pinterest_colored_svg-256.png" />
          </a>
        </div>
        <div></div>
      </footer>
    );
  }
}

export default Footer;