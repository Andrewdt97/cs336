// Andrew Thomas
// Updated for homework03
import React from 'react';
import Person from './Person.js';
import PersonList from './PersonList.js';

import '../css/base.css';


module.exports = React.createClass({
  getInitialState: function() {
    return { firstName: '', lastName: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstName: firstName, lastName: lastName, startDate: startDate});
    this.setState({ firstName: '', lastName: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        />
        <input
          type="text"
          placeholder="startDate"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});