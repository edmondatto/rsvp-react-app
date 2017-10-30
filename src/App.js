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

    guests: [
      {
        name: 'Edmond',
        isConfirmed: false,
        isEditing: false,
      },
      {
        name: 'Shirley',
        isConfirmed: true,
        isEditing: false,
      },
      {
        name: 'Whitney',
        isConfirmed: true,
        isEditing: false,
      }
    ]
  };

  setNameAt = (newName, indexToChange) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            name: newName
          }
        }
        return guest;
      })
    });

  toggleGuestPropertyAt = (indexToChange, property) =>
    this.setState({
      guests: this.state.guests.map((guest, index) => {
        if (index === indexToChange) {
          return {
            ...guest,
            [property]: !guest[property],
          }
        }
        return guest;
      })
    });

  toggleConfirmationAt = index =>
    this.toggleGuestPropertyAt(index, "isConfirmed");

  toggleIsEditingAt = index =>
    this.toggleGuestPropertyAt(index, "isEditing");

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
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
        },
        ...this.state.guests,
      ],
      pendingGuest: "",
    })
  };

  removeGuestAt = (index) =>
    this.setState({
      guests: [
        ...this.state.guests.slice(0,index),
        ...this.state.guests.slice(index + 1)
      ]
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
