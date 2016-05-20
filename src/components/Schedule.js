import React, { Component } from 'react'

export default class Schedule extends Component {

  // constructor() {
  //   super()
  //   this.state = {
  //     games: []
  //   }
  // }

  render() {
    return (
      <div>
        Schedule {this.props.params.teamSlug}
      </div>
    )
  }

}
