import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { isEmpty } from 'lodash'
import Lockr from 'lockr'
import { slugify } from '../helpers'
import schedule from '../../data/spring_thursday_2016.json'
import teams from '../../data/teams.json'
import MdArrowBack from 'react-icons/lib/md/arrow-back'
import FaStar from 'react-icons/lib/fa/star'

import Teams from './Teams'

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      schedule: schedule,
      teams: teams,
      favoriteTeam: {}
    }
  }

  componentDidMount() {
    this.getFavoriteTeam()
  }

  handleFavoriteClick() {
    let slug = slugify(this.state.favoriteTeam)
    browserHistory.push(`/schedule/${slug}`)
  }

  getFavoriteTeam() {
    let fav = Lockr.get('favoriteTeam')
    if (fav) {
      this.setState({
        favoriteTeam: fav
      })
    }
  }

  setFavoriteTeam(team) {
    Lockr.set('favoriteTeam', team)
    this.setState({
      favoriteTeam: team
    })
  }

  render() {
    let { params } = this.props
    let { teams, favoriteTeam } = this.state
    let homepage = isEmpty(params)
    let favorite = isEmpty(favoriteTeam)
    return (
      <div>
        <header>
          <h1>
            <Link to="/">
              {(homepage) ? '' : <MdArrowBack className="icon back" />}
              TC Kickball
            </Link>
          </h1>
          {(favorite) ? '' : <FaStar onClick={::this.handleFavoriteClick} className="icon favorite--header" />}
        </header>
        {React.cloneElement(this.props.children, Object.assign(this.state, {
          setFavoriteTeam: this.setFavoriteTeam.bind(this)
        }))}
      </div>
    )
  }

}
