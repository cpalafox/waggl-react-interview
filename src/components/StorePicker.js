import React from 'react';
import PropTypes from 'prop-types'
import { getFunName } from '../helpers.js'

class StorePicker extends React.Component {
  myInput = React.createRef();
  
  static propTypes = {
    history: PropTypes.object
  }

  gotToStore = event => {
    event.preventDefault();
    const storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  }
  
  render() {
    return (
      <form className="store-selector" onSubmit={this.gotToStore}>
        <h2>Please Enter A Store</h2>
        <input 
          type="text"
          required 
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.myInput}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;