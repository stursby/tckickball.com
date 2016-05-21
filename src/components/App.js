import React, { Component } from 'react'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'
import schedule from '../../data/spring_thursday_2016.json'
import teams from '../../data/teams.json'
import { MdArrowBack } from 'react-icons/lib/md'

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
    let { params } = this.props
    let homepage = isEmpty(params)
    let schedule = (params.teamSlug) ? true : false
    return (
      <div>
        <header>
          <h1>
            <Link to="/">
              {(homepage) ? '' : <MdArrowBack className="back" />}
              TC Kickball
            </Link>
          </h1>
        </header>
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }

}
