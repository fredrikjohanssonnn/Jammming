import React, { Component } from 'react'
import './Track.css'

export default class Track extends Component {

  constructor(props){
    super(props)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

  addTrack(){
    this.props.onAdd = this.props.track
  }

  removeTrack(){
    this.props.onRemove = this.props.track
  }

  renderAction(){
    this.props.isRemoval ? <button onClick={this.removeTrack} className="Track-action">-</button> : <button onClick={this.addTrack} className="Track-action">+</button>
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p></p>
        </div>
        
      </div>
    )
  }
}
