import React from 'react';
import './../styles/Flowers.css';
import Border from './Border';
import flowers from './../data/flowers.json';

class FlowerCard extends React.Component {
  render() {
    return (
      <div className='flower-card'>
        <figure>
          <img src={this.props.image} alt={this.props.name} />
          <span className='flower-text'>
            <figcaption>{this.props.name}</figcaption>
            <p>{this.props.description}</p>
          </span>
        </figure>
      </div>
    );
  }
}

class FlowersTitle extends React.Component {
  render() {
    return (
      <section className='flowers-title'>
        <div className='title'>
          <p>Кожна квітка унікальна і має власне значення у букеті...</p>
        </div>
      </section>
    );
  }
}

class FlowerList extends React.Component {
  render() {
    return (
      <section className='flowers-list'>
        <div className='container'>
          {
            flowers.map((flower) => {
              return (
                <FlowerCard image={flower.image} name={flower.name} description={flower.description} key={flower.id} />)
            })
          }
        </div>
      </section>
    );
  }
}

class Flowers extends React.Component {
  render() {
    return (
      <div className='flowers'>
        <FlowersTitle />
        <Border />
        <FlowerList />
      </div>
    );
  }
}

export default Flowers;
