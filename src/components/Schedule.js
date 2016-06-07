import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { findIndex, keys, find } from 'lodash'
import { slugify } from '../helpers'
import Hammer from 'react-hammerjs'
import FaStar from 'react-icons/lib/fa/star'
import FaStarO from 'react-icons/lib/fa/star-o'

export default class Schedule extends Component {

  constructor() {
    super()
    this.state = {
      teamName: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    this.setState({
      teamName: nextProps.favoriteTeam
    })
  }

  componentWillMount() {
    console.log('componentWillMount()')
    this.showSchedule()
  }

  showSchedule() {
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

  renderStar() {
    let isFavorite = (this.state.teamName === this.props.favoriteTeam)
    if (isFavorite) {
      return (
        <FaStar
          onClick={this.props.setFavoriteTeam.bind(this, {})}
          className="icon favorite"
        />
      )
    }
    return (
      <FaStarO
        onClick={this.props.setFavoriteTeam.bind(this, this.state.teamName)}
        className="icon favorite"
      />
    )
  }

  renderWeek(i) {
    let { week, date, games } = this.props.schedule[i]
    let teamName = this.state.teamName
    let game = find(games, {'home': teamName}) || find(games, {'away': teamName})
    let ref = find(games, {'ref': teamName})
    return (
      <li key={i} className="expired">
        <h4>Week {week} <span className="schedule-date schedule-offset">{date}</span></h4>
        <div className="game">
        {game.home} <span className="vs">vs</span> {game.away}
        <br/>
        <span className="game-details active">Play</span>
          Field {game.field} <span className="schedule-offset">{game.time}</span>
        <br/>
        <span className={(ref) ? 'game-details active': 'game-details'}>Ref</span>
          {(ref && ref.field) ? `Field ${ref.field}` : 'Nope!'}
          <span className="schedule-offset">{(ref) ? `${ref.time}` : '🍻'}</span>
        </div>
      </li>
    )
  }

  render() {
    return (
      <Hammer onSwipe={this.handleSwipe}>
        <div className="schedule-wrapper">
          <h2>
            {this.state.teamName}
            {this.renderStar()}
          </h2>
          <ul className="schedule">
            {Object.keys(this.props.schedule).map(::this.renderWeek)}
          </ul>
        </div>
      </Hammer>
    )
  }

}
