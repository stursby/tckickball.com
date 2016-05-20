import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import css from './styles/style.styl'

import App from './components/App'
import Teams from './components/Teams'
import Schedule from './components/Schedule'
import Detail from './components/Detail'

const router = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Teams}></IndexRoute>
      <Route path='/schedule/:teamSlug' component={Schedule}></Route>
      <Route path='/team/:teamSlug' component={Detail}></Route>
    </Route>
  </Router>
)

ReactDOM.render(router, document.getElementById('app'))
