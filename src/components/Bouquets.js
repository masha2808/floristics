import React from 'react';
import './../styles/Bouquets.css';
import bouquets from './../data/bouquets.json';
import flowers from './../data/flowers.json';
import Border from './Border';
import BouquetPopup from './BouquetPopup';
import { getPages, getBouquetsPage, filterAndSortArray } from '../BouquetsArray';

class BouquetCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert('Букет замовлено');
  }
  render() {
    return (
      <span className='bouquet-card'>
        <figure>
          <img src={this.props.bouquet.image} alt="this.props.title" />
          <figcaption className='title'>
            <button className="btn-popup" onClick={() => { this.props.handlePopupClick(this.props.bouquet) }}>{this.props.bouquet.title}</button>
          </figcaption>
        </figure>
        <p className='price'>{this.props.bouquet.price} ГРН</p>
        <button className="btn-buy" onClick={this.handleClick}>Замовити</button>
      </span>

    );
  }
}

class SortingAndFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    }
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }
  handleSearchInput(value) {
    this.setState({
      search: value
    });
  }
  render() {
    return (
      <div className="sorting-filters">
        <form>
          <fieldset className="sorting">
            <legend>Сортування: </legend>
            <select onChange={(event) => { this.props.handleSortingField(event.target.value) }}>
              <option value="sales">Популярність</option>
              <option value="title">Назва</option>
              <option value="price">Ціна</option>
              <option value="date">Новинки</option>
            </select>
            {this.props.sortingIncrease ? <input type="button" className="arrow" value="&#8593;"
              onClick={this.props.handleSortingIncrease} /> :
              <input type="button" className="arrow" value="&#8595;"
                onClick={this.props.handleSortingDecrease} />}
          </fieldset>
          <fieldset className="filter-price">
            <legend>Ціна: </legend>
            <label>Від: </label>
            <input className="number" type="number" value={this.props.minPrice} min="0"
              max={this.props.maxPrice} step="10" onChange={(event) => this.props.handleMinPrice(event.target.value)} />
            <label>До: </label>
            <input className="number" type="number" value={this.props.maxPrice} min={this.props.minPrice}
              max="1000" step="10" onChange={(event) => this.props.handleMaxPrice(event.target.value)} />
          </fieldset>
          <fieldset className="filter-flower-count">
            <legend>Кідькість квітів у букеті: </legend>
            <label>Від: </label>
            <input className="number" type="number" value={this.props.minCount} min="3"
              max={this.props.maxCount} step="2" onChange={(event) => this.props.handleMinCount(event.target.value)} />
            <label>До: </label>
            <input className="number" type="number" value={this.props.maxCount} min={this.props.minCount}
              max="103" step="2" onChange={(event) => this.props.handleMaxCount(event.target.value)} />
          </fieldset>
          <fieldset className="search">
            <legend>Пошук: </legend>
            <input type="text" className="text" value={this.state.search}
              onChange={(event) => this.handleSearchInput(event.target.value)} />
            <input type="button" className="btn-search" onClick={() => this.props.handleSearch(this.state.search)} />
          </fieldset>
          <fieldset className="filter-composition">
            <legend>Склад букету: </legend>
            {
              this.props.flowers.map((flower, index) => {
                return (
                  <span key={index}>
                    <input type="checkbox" value={flower.name} key={flower.id}
                      onChange={(event) => this.props.handleComposition(event.target.value, event.target.checked)} />
                    <label key={index}>{flower.name}</label>
                  </span>
                )
              })
            }
          </fieldset>
        </form>
      </div>
    );
  }
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(value) {
    this.setState({
      currentPage: value
    })
  }
  render() {
    const pages = getPages(this.props.bouquets);
    const items = [];
    for (let i = 1; i <= pages; i += 1) {
      items.push(<button className={(parseInt(this.state.currentPage, 10) === i) ? "current" : "btn-pagination" } 
      onClick={(event) => {this.props.handlePage(event.target.value); this.handleClick(event.target.value)}} 
      key={i} value={i}>{i}</button>);
    }
    return (
      <div className="pagination">
        {items}
      </div>
    );
  }
}

class BouquetsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingField: "sales",
      sortingIncrease: true,
      bouquets: filterAndSortArray(bouquets, "", this.props.category, 0, 1000, 3, 103, [], "sales", true),
      bouquetsPage: getBouquetsPage(filterAndSortArray(bouquets, "", this.props.category, 0, 1000, 3, 103, [], "sales", true), 1),
      flowers: flowers,
      category: this.props.category,
      minPrice: 0,
      maxPrice: 1000,
      minCount: 3,
      maxCount: 103,
      composition: [],
      currentPage: 1,
      search: ""
    };
    this.handleSortingField = this.handleSortingField.bind(this);
    this.handleSortingIncrease = this.handleSortingIncrease.bind(this);
    this.handleSortingDecrease = this.handleSortingDecrease.bind(this);
    this.handleMinPrice = this.handleMinPrice.bind(this);
    this.handleMaxPrice = this.handleMaxPrice.bind(this);
    this.handleMinCount = this.handleMinCount.bind(this);
    this.handleMaxCount = this.handleMaxCount.bind(this);
    this.handleComposition = this.handleComposition.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.category !== prevState.category) {
      this.setState({
        sortingField: "sales",
        sortingIncrease: true,
        bouquets: filterAndSortArray(bouquets, "", this.props.category, 0, 1000, 3, 103, [], "sales", true),
        bouquetsPage: getBouquetsPage(filterAndSortArray(bouquets, "", this.props.category, 0, 1000, 3, 103, [], "sales", true), 1),
        flowers: flowers,
        category: this.props.category,
        minPrice: 0,
        maxPrice: 1000,
        minCount: 3,
        maxCount: 103,
        composition: [],
        currentPage: 1
      });
    }
  }
  handleSortingField(fieldValue) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, fieldValue, this.state.sortingIncrease);
    this.setState({
      sortingField: fieldValue,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleSortingIncrease() {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, false);
    this.setState({
      sortingIncrease: false,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleSortingDecrease() {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, true);
    this.setState({
      sortingIncrease: true,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleMinPrice(value) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, value,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease);
    this.setState({
      minPrice: value,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleMaxPrice(value) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      value, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease);
    this.setState({
      maxPrice: value,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleMinCount(value) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, value, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease);
    this.setState({
      minCount: value,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleMaxCount(value) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, value, this.state.composition, this.state.sortingField, this.state.sortingIncrease);
    this.setState({
      maxCount: value,
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      currentPage: 1
    });
  }
  handleComposition(value, checked) {
    if (checked) {
      this.state.composition.push(value);
      const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
        this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease);
      this.setState({
        bouquets: bouquetsArray,
        bouquetsPage: getBouquetsPage(bouquetsArray, 1),
        currentPage: 1
      })
    } else {
      const index = this.state.composition.indexOf(value);
      if (index > -1) {
        this.state.composition.splice(index, 1);
        const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
          this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease)
        this.setState({
          bouquets: bouquetsArray,
          bouquetsPage: getBouquetsPage(bouquetsArray, 1),
          currentPage: 1
        });
      }
    }
  }
  handlePage(value) {
    const bouquetsArray = filterAndSortArray(bouquets, this.state.search, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease)
    this.setState({
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, value),
      currentPage: value
    })
  }
  handleSearch(value) {
    const bouquetsArray = filterAndSortArray(bouquets, value, this.state.category, this.state.minPrice,
      this.state.maxPrice, this.state.minCount, this.state.maxCount, this.state.composition, this.state.sortingField, this.state.sortingIncrease)
    this.setState({
      bouquets: bouquetsArray,
      bouquetsPage: getBouquetsPage(bouquetsArray, 1),
      search: value
    });
  }
  render() {
    return (
      <section className='bouquets-list'>
        <h1>{this.state.category}</h1>
        <SortingAndFilters sortingIncrease={this.state.sortingIncrease} flowers={this.state.flowers}
          handleSortingField={this.handleSortingField} handleSortingIncrease={this.handleSortingIncrease}
          handleSortingDecrease={this.handleSortingDecrease} handleComposition={this.handleComposition}
          handleMinPrice={this.handleMinPrice} minPrice={this.state.minPrice}
          handleMaxPrice={this.handleMaxPrice} maxPrice={this.state.maxPrice}
          handleMinCount={this.handleMinCount} minCount={this.state.minCount}
          handleMaxCount={this.handleMaxCount} maxCount={this.state.maxCount}
          handleSearch={this.handleSearch} />
        {this.state.bouquets.length !== 0 ?
          <div>
            <div className='container'>
              {
                this.state.bouquetsPage.map((bouquet) => {
                  return (
                    <BouquetCard handlePopupClick={this.props.handlePopupClick} bouquet={bouquet} key={bouquet.id} />)
                })
              }
            </div>
            <Pagination handlePage={this.handlePage} bouquets={this.state.bouquets} currentPage={this.state.currentPage} />
          </div> : <h2>За вашим запитом, на жаль, нічого не знайдено</h2>}
      </section>
    );
  }
}

class BouquetTitle extends React.Component {
  render() {
    return (
      <section className='bouquets-title'>
        <svg viewBox="0 0 350 350">
          <circle cx="175" cy="175" r="170" className="dotted" />
          <foreignObject x="10" y="10" height="330px" width="330px">
            <p>Оберіть букет мрії</p>
          </foreignObject>
        </svg>
      </section>
    );
  }
}

class Bouquets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupClicked: false,
      bouquet: null
    };
    this.handlePopupClick = this.handlePopupClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }
  handlePopupClick(value) {
    this.setState({
      popupClicked: true,
      bouquet: value
    });
  }
  handleCloseClick() {
    this.setState({
      popupClicked: false,
      bouquet: null
    });
  }
  render() {
    return (
      <div className='bouquets'>
        {this.state.popupClicked ? <BouquetPopup handleCloseClick={this.handleCloseClick} bouquet={this.state.bouquet} /> : null}
        <BouquetTitle />
        <Border />
        <BouquetsList handlePopupClick={this.handlePopupClick} category={this.props.category} />
        <Border />
      </div>
    )
  }
}

export default Bouquets;