import React, { Component } from 'react';
import './App.css';
import GuestList from "./components/GuestList";
import Counter from "./components/Counter";
import Header from "./components/Header";
import ConfirmedFilter from "./components/ConfirmedFilter";

class App extends Component {
  state = {
    isFiltered: false,

    pendingGuest: "",

    guests: []
  };

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  };

  setNameAt = (newName, id) =>
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            name: newName
          }
        }
        return guest;
      })
    });

  toggleGuestPropertyAt = (id, property) =>
    this.setState({
      guests: this.state.guests.map(guest => {
        if (id === guest.id) {
          return {
            ...guest,
            [property]: !guest[property],
          }
        }
        return guest;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt(id, "isConfirmed");

  toggleIsEditingAt = id =>
    this.toggleGuestPropertyAt(id, "isEditing");

  toggleFilter = () =>
    this.setState({
      isFiltered: !this.state.isFiltered
    });

  handleNameInput = e =>
    this.setState({
      pendingGuest: e.target.value
    });

  handleNewGuest = e => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests,
      ],
      pendingGuest: "",
    })
  };

  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    (this.state.guests.filter(guest => guest.isConfirmed)).length;

  getUnconfirmedGuests = () => {
    return (
      this.getTotalInvited() - this.getAttendingGuests()
    )
  };

  render() {
    return (
      <div className="App">
        <Header
          pendingGuest={this.state.pendingGuest}
          handleNameInput={this.handleNameInput}
          handleNewGuest={this.handleNewGuest}
        />
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <ConfirmedFilter
              handleToggleChange={this.toggleFilter}
              isFiltered={this.state.isFiltered}
            />
          </div>
          <Counter
            confirmedGuests={this.getAttendingGuests()}
            unconfirmedGuests={this.getUnconfirmedGuests()}
            totalGuests={this.getTotalInvited()}
          />
          <GuestList
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleIsEditingAt={this.toggleIsEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            guests={this.state.guests}
            removeGuestAt={this.removeGuestAt}
            pendingGuest={this.state.pendingGuest}
          />
         </div>
      </div>
    );
  }
}

export default App;
