import { Link } from 'react-router-dom';
import React from 'react';
import './../styles/Header.css'


class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <h1>Le Paradis des Fleurs</h1>
        <Nav />
      </header>
    );
  }
}

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <ul className="topmenu">
          <li>
            <Link className="link" to="/">Головна</Link>
          </li>
          <li>
            <Link className="link" to="/about">Про нас</Link>
          </li>
          <li>
            <p>Магазин</p>
            <ul className="submenu">
              <li>
                <Link className="link" to="/bouquets">Усі букети</Link>
                <ul className="submenu">
                  <li>
                    <Link className="link" to="/bouquets/monobouquets">Монобукети</Link>
                  </li>
                  <li>
                    <Link className="link" to="/bouquets/prefabricated-bouquets">Збірні букети</Link>
                  </li>
                  <li>
                    <Link className="link" to="/bouquets/baskets-of-flowers">Кошики квітів</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className="link" to="/bouquet-creation">Створити букет</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="link" to="/contact">Контакти</Link>
          </li>
        </ul>
      </nav>

    );
  }
}

export default Header;