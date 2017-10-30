import React from 'react';
import PropTypes from 'prop-types';

const Counter = props =>
  <table className="counter">
    <tbody>
    <tr>
      <td>Attending:</td>
      <td>{ props.confirmedGuests }</td>
    </tr>
    <tr>
      <td>Unconfirmed:</td>
      <td>{ props.unconfirmedGuests }</td>
    </tr>
    <tr>
      <td>Total:</td>
      <td>{ props.totalGuests }</td>
    </tr>
    </tbody>
  </table>;

Counter.propTypes = {
  confirmedGuests: PropTypes.number.isRequired,
  unconfirmedGuests: PropTypes.number.isRequired,
  totalGuests: PropTypes.number.isRequired,
};

export default Counter;