// Andrew Thomas
// Updated for homework03
import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  
  render: function() {
    return (
      <div className="person">
        <h3 className="name">
          {this.props.firstName} {this.props.lastName}
        </h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});