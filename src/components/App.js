import React, { Component } from 'react'
import { Link } from 'react-router'
import schedule from '../../data/spring_thursday_2016.json'
import teams from '../../data/teams.json'

import Teams from './Teams'

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      schedule: schedule,
      teams: teams
    }
  }

  // renderWeek(key) {
  //   // console.log(key)
  //   // return (
  //   //   <li key={key.week}>Week {key.week} - {key.date}</li>
  //   // )
  // }

  // renderTeam(team) {
  //   console.log(team);
  // }

  render() {
    return (
      <div>
        <header>
          <h1>
            <Link to="/">TC Kickball</Link>
          </h1>
        </header>
        {React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }

}
