import React from 'react'
import './../styles/BouquetPopup.css'

class BouquetPopup extends React.Component {
  render() {
    return (
      <div className='popup-background'>
        <div className='bouquet-popup'>
          <img src={this.props.bouquet.image} alt="" />
          <div className="bouquet-data">
            <h1>{this.props.bouquet.title}</h1>
            <button className="btn-close" onClick={this.props.handleCloseClick}>&times;</button>
            <p><strong>Ціна:</strong> {this.props.bouquet.price} ГРН</p>
            <p><strong>Кількість квітів у букеті:</strong> {this.props.bouquet.flowersCount}</p>
            <p><strong>Нагода:</strong> {this.props.bouquet.occasion}</p>
            <p><strong>Склад букета:</strong></p>
            <ul>
              {
                this.props.bouquet.composition.map((flower, index) => {
                  return (
                    <li key={index}>{flower}</li>)
                })
              }
            </ul>
            
          </div>
        </div>
      </div>
    );
  }
}

export default BouquetPopup;