import React, { Component } from 'react'
import { Link } from 'react-router'
import { shadeColor, slugify, sortObject } from '../helpers'
import MdKeyboardArrowRight from 'react-icons/lib/md/keyboard-arrow-right'

export default class Teams extends Component {

  renderTeam(team, i) {
    let color = this.props.teams[team]
    let darkened = shadeColor(color, -20)
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
            {<MdKeyboardArrowRight />}
          </span>
        </Link>
      </li>
    )
  }

  render() {
    let teams = sortObject(this.props.teams)
    return (
      <ul className="teams">
        {Object.keys(teams).map(::this.renderTeam)}
      </ul>
    )
  }

}
