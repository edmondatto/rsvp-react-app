import React, { Component } from 'react';
import './App.css';
import GuestList from "./components/GuestList";

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
        isEditing: true,
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

  getTotalInvited = () => this.state.guests.length;

  // getAttendingGuests = () => TODO
  // getUnconfirmedGuests = () => TODO

  render() {
    return (
      <div className="App">
        <header>
          <h1>RSVP</h1>
          <p>Making event planning fun again</p>
          <form onSubmit={this.handleNewGuest}>
            <input
              type="text"
              onChange={this.handleNameInput}
              value={this.state.pendingGuest}
              placeholder="Invite Someone"
            />
              <button type="submit" name="submit" value="submit">Submit</button>
          </form>
        </header>
        <div className="main">
          <div>
            <h2>Invitees</h2>
            <label>
              <input
                type="checkbox"
                onChange={this.toggleFilter}
                checked={this.state.isFiltered}
              /> Hide those who haven't responded
            </label>
          </div>
          <table className="counter">
            <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
            </tbody>
          </table>
          <GuestList
            toggleConfirmationAt={this.toggleConfirmationAt}
            toggleIsEditingAt={this.toggleIsEditingAt}
            setNameAt={this.setNameAt}
            isFiltered={this.state.isFiltered}
            guests={this.state.guests}
          />
         </div>
      </div>
    );
  }
}

export default App;
