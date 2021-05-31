import React from 'react';
import Border from './Border';
import about from './../data/about.json';
import './../styles/About.css';

class About extends React.Component {
  render() {
    return (
      <div className="about">
        <AboutTitle />
        <Border />
        <Gallery />
        <Border />
      </div>
    );
  }
}

class AboutTitle extends React.Component {
  render() {
    return (
      <section className="about-title">
        <h1>Le Paradis des Fleurs</h1>
        <div className="info">
          <h2>Про нас</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </section>
    );
  }
}

class Gallery extends React.Component {
  render() {
    return (
      <section className="gallery">
        <h1>Галерея</h1>
        <div className='container'>
          {
            about.map((item) => {
              return (
                <img src={item.image} alt={item.id} key={item.id} />)
            })
          }
        </div>
      </section>
    );
  }
}

export default About;

