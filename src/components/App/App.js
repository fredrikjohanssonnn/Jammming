import React, { Component } from 'react'
import './App.css'
import SearchResults from '../SearchResults/SearchResults'
import SearchBar from '../SearchBar/SearchBar'
import PlayList from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            searchResults: [],
            playlistName: 'New Playlist Name',
            playlistTracks: []
        }
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.updatePlaylistName = this.updatePlaylistName.bind(this)
        this.savePlaylist = this.savePlaylist.bind(this)
        this.search = this.search.bind(this)
    }
    
    addTrack(track) {
        let trackPlayList = false;
        this.state.playlistTracks.forEach(playlistTrack => {
          if (playlistTrack.id === track.id) {
            trackPlayList = true;
            }
          }
        );
          if (!trackPlayList) {
            let updatePlaylist = this.state.playlistTracks;
            updatePlaylist.push(track);
            this.setState({playlistTracks: updatePlaylist});
          }
      }

    removeTrack(track){
        const newArr = this.state.playlistTracks.filter(e => e.id !== track.id)
        this.setState({ playlistTracks: newArr })
    }

    updatePlaylistName(name){
        this.setState({ playlistName: name })
    }

    savePlaylist(){

        let trackURIs = [];
        this.state.playlistTracks.forEach(playlistTrack => {
        trackURIs.push(playlistTrack.uri);
        });
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({playlistTracks:[], playlistName: 'New Playlist', searchResults:[]});
    }

    search(term){
        Spotify.search(term).then(tracks => this.setState({ searchResults: tracks }))
    }

    render() {
        return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">
                <SearchBar onSearch={this.search} />
                <div className="App-playlist">
                    <SearchResults onAdd={this.addTrack} results={this.state.searchResults} />
                    <PlayList onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} name={this.state.playlistName} tracks={this.state.playlistTracks} />
                </div>
            </div>
        </div>
        )
    }
}
