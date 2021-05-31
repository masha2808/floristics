import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Bouquets from './components/Bouquets';
import About from './components/About';
import MainPage from './components/MainPage';
import Contact from './components/Contact';
import BouquetCreation from './components/BouquetCreation';
import Footer from './components/Footer';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GoToTop />
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={About} />
          <Route exact path="/bouquets" >
            <Bouquets category="Усі букети" />
          </Route>
          <Route exact path="/bouquets/monobouquets" >
            <Bouquets category="Монобукети" />
          </Route>
          <Route exact path="/bouquets/prefabricated-bouquets" >
            <Bouquets category="Збірні букети" />
          </Route>
          <Route exact path="/bouquets/baskets-of-flowers" >
            <Bouquets category="Кошики квітів" />
          </Route>
         <Route path="/bouquet-creation" component={BouquetCreation} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

function GoToTop() {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    onTop()
  }, [routePath]);

  return null;
}

export default App;
