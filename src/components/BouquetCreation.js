import React from 'react';
import Border from './Border';
import './../styles/BouquetCreation.css';
import flowers from './../data/flowers.json';
import materials from './../data/materials.json';

class BouquetCreation extends React.Component {
  render() {
    return (
      <section className="bouquet-creation">
        <BouquetCreationTitle />
        <Border />
        <Creation />
        <Border />
      </section>
    );
  }
}

class BouquetCreationTitle extends React.Component {
  render() {
    return (
      <section className='bouquet-creation-title'>
        <div className='title'>
          <p>Створіть букет своєї мрії</p>
        </div>
      </section>
    );
  }
}

class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowers: this.flowersArray(),
      materials: this.materialsArray(),
      price: this.calculatePrice(this.flowersArray(), this.materialsArray())
    }
    this.handleFlowerAmount = this.handleFlowerAmount.bind(this);
    this.handleMaterialCheck = this.handleMaterialCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleFlowerAmount(value, amount) {
    const array = [];
    this.state.flowers.forEach((item) => {
      if (item === value) {
        array.push({"flower": item.flower, "amount": amount});
      } else {
        array.push(item);
      }
    })
    this.setState({
      flowers: array,
      price: this.calculatePrice(array, this.state.materials)
    });
  }
  handleMaterialCheck(value) {
    const array = [];
    this.state.materials.forEach((item) => {
      if (item === value) {
        array.push({"material": item.material, "checked": true});
      } else {
        array.push({"material": item.material, "checked": false});
      }
    })
    this.setState({
      materials: array,
      price: this.calculatePrice(this.state.flowers, array)
    });
  }
  flowersArray() {
    const newFlowers = [];
    flowers.forEach((flower) => {
      newFlowers.push({'flower': flower, 'amount': 0})
    });
    return newFlowers;
  }
  materialsArray() {
    const newMaterials = [];
    materials.forEach((material) => {
      newMaterials.push({'material': material, 'checked': false})
    });
    if (newMaterials.length > 0) {
      newMaterials[0].checked = true;
    }
    return newMaterials;
  }
  checkFlowersAmount() {
    let count = 0;
    this.state.flowers.forEach(item => {
      count += parseInt(item.amount, 10);
    });
    if (count < 3) {
      alert('У букеті повинно бути мінімум 3 квітки');
      return false;
    }
    return true;
  }
  calculatePrice(flowers, materials) {
    let count = 0;
    let price = 0;
    flowers.forEach(item => {
      count += parseInt(item.amount, 10);
      price += parseInt(item.amount, 10) * parseInt(item.flower.price, 10);
    });
    if (count > 20 && count < 51) {
      price *= 1.25;
    } else if (count > 50) {
      price += 1.5;
    }
    materials.forEach(item => {
      if (item.checked) {
        price += item.material.price;
      }
    });
    return price;
  }
  handleClick() {
    if (this.checkFlowersAmount()) {
      alert('Букет замовлено');
    }
  }
  render() {
    return (
      <section className="creation">
        <form>
          <fieldset className="flowers-list">
            <legend><strong>Оберіть квіти: </strong></legend>
            <div className="list">
              {
                this.state.flowers.map((item) => {
                  return (
                    <div className="card" key={item.flower.id}>
                      <figure>
                        <img src={item.flower.image} alt={item.flower.name} />
                        <figcaption><strong>{item.flower.name}</strong></figcaption>
                        <p><strong>Ціна: </strong>{item.flower.price} ГРН</p>
                        <label><strong>Кількість: </strong></label>
                        <input type="number" min="0" max="103" value={item.amount} 
                        onChange={(event) => this.handleFlowerAmount(item, event.target.value)} />
                      </figure>
                    </div>)
                })
              }
            </div>
          </fieldset>
          <fieldset className="material-list">
            <legend><strong>Оберіть споіб пакування: </strong></legend>
            <div className="list">
              {
                this.state.materials.map((item) => {
                  return (
                    <div className="card" key={item.material.id}>
                      <figure>
                        <img src={item.material.image} alt={item.material.name} />
                        <figcaption><strong>{item.material.name}</strong></figcaption>
                        <p><strong>Ціна: </strong>{item.material.price} ГРН</p>
                        <label><strong>Обрати: </strong></label>
                        <input type="checkbox" checked={item.checked} 
                          onChange={() => this.handleMaterialCheck(item)} />
                      </figure>
                    </div>)
                })
              }
            </div>
          </fieldset>
          <div>
            <label className="price"><strong>Ціна: </strong></label>
            <label className="price">{this.state.price} ГРН</label><br/>
          </div>
          <input type="button" className="btn-buy" value="Замовити" onClick={this.handleClick}/>
        </form>
      </section>
    );
  }
}

export default BouquetCreation;