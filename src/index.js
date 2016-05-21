import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Fastclick from 'fastclick'

import css from './styles/style.styl'

import App from './components/App'
import Teams from './components/Teams'
import Schedule from './components/Schedule'
import Detail from './components/Detail'
import NotFound from './components/NotFound'

const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Teams} />
      <Route path="/schedule/:teamSlug" component={Schedule} />
      {/*<Route path="/detail/:something" component={Detail} />*/}
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

Fastclick.attach(document.body)

ReactDOM.render(router, document.getElementById('app'))
