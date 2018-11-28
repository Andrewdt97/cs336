// Andrew Thomas
// CS336 lab08

import React from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import { Router, Route, browserHistory } from 'react-router';
import $ from 'jquery';

import CommentBox from './CommentBox.js';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/:id" component={CommentEdit} />
  </Router>
), document.getElementById('app'));