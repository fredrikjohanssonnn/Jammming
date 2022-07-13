import React, { Component } from 'react'
import './Playlist.css'
import TrackList from '../TrackList/TrackList'

export default class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <TrackList onRemoval={true} onRemove={this.props.onRemove} tracks={this.props.tracks} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    )
  }
}
