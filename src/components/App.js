import React from "react";
import PropTypes from "prop-types";
import Header from "./Header"
import Inventory from "./Inventory"
import Order from "./Order"
import Fish from "./Fish"
import sampleFishes from "../sample-fishes"

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  
  static propTypes = {
    match: PropTypes.object
  }
  
  componentDidMount() {
    const { params } = this.props.match;
    
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }
  
  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }
  
  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    
    fishes[`fish${Date.now()}`] = fish;
    
    this.setState({ fishes });
  }
  
  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    
    fishes[key] = updatedFish;
    
    this.setState({ fishes });
  }
  
  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    
    fishes[key] =  null;
    
    this.setState({ fishes });
  }
  
  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  }
  
  removeFromCart = (key) => {
    const order = { ...this.state.order };
    
    delete order[key]
    
    this.setState({ order });
  }
  
  /* 
    this.state.fishes is an object, each object contains:
    
    { 
      fish1: { 
        desc: "description of the fish",
        image: "url or filepath",
        name: "name",
        price: 1243,
        status: "available"    // or unavailable
      },
      fish2: { ... }
      fish3: { ... }
    }
    
    There's a formatPrice method in the helper.js file that you could use to give it the right format:
    1243 => $12.43
  */
  
  
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"></Header>
          <ul className="fishes">
            
            
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromCart={this.removeFromCart} />
        <Inventory fishes={this.state.fishes} addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} updateFish={this.updateFish} deleteFish={this.deleteFish} />
      </div>
    )
  }
}

export default App;
