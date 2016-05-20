import React, { Component } from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import schedule from '../../data/spring_thursday_2016.json'
import teams from '../../data/teams.json'
import ArrowBack from 'react-icons/lib/md/arrow-back'

import Teams from './Teams'

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      schedule: schedule,
      teams: teams
    }
  }

  render() {
    let homepage = isEmpty(this.props.params)
    return (
      <div>
        <header>
          <h1>
            <Link to="/">
              {(homepage) ? '' : <ArrowBack className="back" />}
              TC Kickball
            </Link>
          </h1>
        </header>
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }

}
