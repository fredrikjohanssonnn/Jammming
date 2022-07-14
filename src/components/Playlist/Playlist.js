import React, { Component } from 'react'
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

export default class Playlist extends Component {

  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.name} />
        <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.tracks} />
        <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
