import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import css from './styles/style.styl'

import App from './components/App'
import Teams from './components/Teams'
import Schedule from './components/Schedule'
import Detail from './components/Detail'
import NotFound from './components/NotFound'

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Teams} />
      <Route path="/schedule/:teamSlug" component={Schedule} />
      {/*<Route path="/detail/:something" component={Detail} />*/}
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

ReactDOM.render(router, document.getElementById('app'))
