import React from 'react';
import PropTypes from 'prop-types';
import Guest from "./Guest";

const GuestList = props =>
  <ul>
    {props.guests.map((guest,index) =>
      <Guest
        name={guest.name}
        isConfirmed={guest.isConfirmed}
        key={index}
        handleConfirmation={() => props.toggleConfirmationAt(index)}
      />)}
  </ul>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
};


export default GuestList;