import React from 'react';
import './../styles/Border.css';

class Border extends React.Component {
  render() {
    return (
      <div className='section-border'>
        <div className='dotted-border'></div>
        <div className='solid-border'></div>
      </div>
    );
  }
}

export default Border;