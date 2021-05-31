import React from 'react';
import Border from './../components/Border';
import './../styles/Contact.css';
import contact from './../data/contact.json';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

class Contact extends React.Component {
  render() {
    return (
      <div className="contact">
        <ContactTitle />
        <Border />
        <ContactInfo />
        <Border />
      </div>
    );
  }
}

class ContactTitle extends React.Component {
  render() {
    return (
      <section className="contact-title">
        <h1>Як нас знайти?</h1>
      </section>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    const position = [50.45479548437433, 30.623033693062865]
    let DefaultIcon = L.icon({
      iconUrl: icon
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    return (
      <section className="contact-info">
        <div className="map">
          <Map center={position} zoom={13} scrollWheelZoom={false} >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Флористичний салон <br /> "Le Paradis des Fleurs".
              </Popup>
            </Marker>
          </Map>
        </div>
        <div className="info">
          <p><strong>Адреса:</strong> {contact.address}</p>
          <p><strong>Телефон:</strong></p>
          <p>{contact.phone1}</p>
          <p>{contact.phone2}</p>
          <p><strong>Графік роботи:</strong></p>
          {
            contact.schedule.map((item, index) => {
              return (
                <p key={index}>{item}</p>)
            })
          }
        </div>
      </section>
    );
  }
}

export default Contact;