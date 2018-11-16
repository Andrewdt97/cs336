// Andrew Thomas
// CS336 lab08
// Updated for homework03

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

import PersonBox from './PersonBox.js';


ReactDOM.render(
  <PersonBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);