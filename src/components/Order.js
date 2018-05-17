import React, { Component } from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromCart: PropTypes.func
  };
  
  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    if(!fish) return null;

    if(isAvailable) {
      return (
        <div className="order" key={key}>
          <li key={key}>
            <span>
              <span className="count">
                <span className="count" key={key}>
                  <span>{ count }</span>
                </span>
              </span>
              lbs {fish.name}
              { formatPrice(count * fish.price) }
              <button onClick={() => this.props.removeFromCart(key)}>&times;</button>
            </span>
          </li>
        </div>
      );
    } else {
      return (
        <div className="order" key={key}>
          <li key={key}>
            Sorry { fish ? fish.name : 'fish' } is no longer available
            <button onClick={() => this.props.removeFromCart(key)}>&times;</button>
          </li>   
        </div> 
      );
    }    
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      
      if(isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          { orderIds.map(this.renderOrder) }
        </ul>
        <div className="total">
          Total: 
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }

}

export default Order;