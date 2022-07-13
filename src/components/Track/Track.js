import React, { Component } from 'react'
import './Track.css'

export default class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3></h3>
          <p></p>
        </div>
        <button className="Track-action"></button>
      </div>
    )
  }
}
