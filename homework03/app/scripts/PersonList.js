// Andrew Thomas
// Updated for homework03
import React from 'react';

import Person from './Person.js';
import PersonForm from './PersonForm.js';

module.exports = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person key={person.id} firstName={person.firstName} lastName={person.lastName}>
          {person.startDate}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});