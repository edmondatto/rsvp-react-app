import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from "./GuestInputForm";

const Header = props =>
  <header>
    <h1>RSVP</h1>
    <p>Making event planning fun again</p>
    <GuestInputForm
      handleNameInput={props.handleNameInput}
      pendingGuest={props.pendingGuest}
      handleNewGuest={props.handleNewGuest}
    />
  </header>;

Header.propTypes = {
  pendingGuest: PropTypes.string.isRequired,
  handleNameInput: PropTypes.func.isRequired,
  handleNewGuest: PropTypes.func.isRequired,
};

export default Header;