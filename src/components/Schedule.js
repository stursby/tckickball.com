import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { findIndex, keys, find } from 'lodash'
import { slugify } from '../helpers'
import Hammer from 'react-hammerjs'
import { FaStarO, FaStar } from 'react-icons/lib/fa'

export default class Schedule extends Component {

  constructor() {
    super()
    this.state = {
      teamName: ''
    }
  }

  componentWillMount() {
    let { teams } = this.props
    let teamSlug = this.props.params.teamSlug
    let teamNames = keys(teams)
    let index = findIndex(teamNames, function(name) { return slugify(name) == teamSlug })
    this.setState({
      teamName: teamNames[index]
    })
  }

  handleSwipe(e) {
    if (e.direction === 4) {
      browserHistory.push('/')
    }
  }

  renderWeek(i) {
    let { week, date, games } = this.props.schedule[i]
    let teamName = this.state.teamName
    let game = find(games, {'home': teamName}) || find(games, {'away': teamName})
    return (
      <li key={i}>
        <h4>Week {week}  <span className="schedule-date schedule-offset">{date}</span></h4>
        <div className="game">
        {game.home} &nbsp;vs&nbsp; {game.away}
        <br/>
        Field {game.field} <span className="schedule-offset">{game.time}</span>
        </div>
      </li>
    )
  }

  render() {
    return (
      <Hammer onSwipe={this.handleSwipe}>
        <div className="schedule-wrapper">
          <h2>{this.state.teamName}</h2>
          <ul className="schedule">
            {Object.keys(this.props.schedule).map(::this.renderWeek)}
          </ul>
        </div>
      </Hammer>
    )
  }

}
