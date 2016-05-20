import React, { Component } from 'react'
import { Link } from 'react-router'
import { shadeColor, slugify } from '../helpers'
import KeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

export default class Teams extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //     games: []
  //   }
  // }

  renderTeam(team, i) {
    let color = this.props.teams[team]
    let darkened = shadeColor(color, -5)
    let style = {
      background: color,
      border: `1px solid ${darkened}`
    }
    let slug = slugify(team)
    return (
      <li key={i} className="team">
        <Link to={`/schedule/${slug}`}>
          <span className="team-color" style={style}></span>
          <p>{team}</p>
          <span className="team-arrow">
            <KeyboardArrowRight />
          </span>
        </Link>
      </li>
    )
  }

  render() {
    return (
      <ul className="teams">
        {Object.keys(this.props.teams).map(::this.renderTeam)}
      </ul>
    )
  }

}
