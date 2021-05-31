import { Link } from 'react-router-dom';
import React from 'react';
import Flowers from './Flowers';
import Border from './Border';
import './../styles/MainPage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import main1 from './../data/images/main1.jpg';
import main2 from './../data/images/main2.jpg';
import main3 from './../data/images/main3.jpg';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <SliderSection />
        <Border />
        <Store />
        <Border />
        <Flowers />
        <Border />
      </div>
    );
  }
}

class Store extends React.Component {
  render() {
    return (
      <section className="store">
        <p>Обріть букет з наявних або створіть власний</p>
        <div className="store-link">
          <div className="link-background">
            <Link className="link" to="/bouquets">Обрати букет</Link>
          </div>
          <div className="link-background">
            <Link className="link" to="/bouquet-creation">Створити букет</Link>
          </div>
        </div>
      </section>
    );
  }
}

class SliderSection extends React.Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };
    return (
      <div className="slider-title">
        <div className="slider" onLoad={this.play}>
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            <img src={main1} alt="1" />
            <img src={main2} alt="2" />
            <img src={main3} alt="3" />
          </Slider>
        </div>
        <Border />
        <h1>Флористичний салон "Le Paradis des Fleurs"</h1>
      </div>
    );
  }
}

export default MainPage;