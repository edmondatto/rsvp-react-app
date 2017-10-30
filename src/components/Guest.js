import React from 'react';
import PropTypes from 'prop-types';
import GuestName from './GuestName';

const Guest = props =>
  <li>
    <GuestName
      isEditing={props.isEditing}
      handleNameEdit={e => props.setName(e.target.value)}
    >
      { props.name }
    </GuestName>
    <label>
      <input
        type="checkbox"
        checked={props.isConfirmed}
        onChange={props.handleConfirmation}
      /> Confirmed
    </label>
    <button onClick={props.handleEditing}>
      {props.isEditing ? "save" : "edit"}
    </button>
    <button onClick={props.handleGuestRemoval}>remove</button>
  </li>;

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  handleGuestRemoval: PropTypes.func.isRequired,
};

export default Guest;
