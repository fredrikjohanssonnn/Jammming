import React, { Component } from 'react'
import './App.css'
import SearchResults from '../SearchResults/SearchResults'
import PlayList from '../Playlist/Playlist'

export default class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            searchResults: [],
            playlistName: 'Summer',
            playlistTracks: [
                {
                    id: 1,
                    name: 'Rullar fram',
                    artist: 'Fronda',
                    album: 'Fridlysta Frekvenser'
                }
            ]
        }
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }
    
    addTrack(track){
        if (this.state.playlistTracks.some(e => e.id !== track.id)){
            const newArr = this.state.playlistTracks.push(track)
            this.setState({ playlistTracks: newArr })
        } else {
            return
        }
    }

    removeTrack(track){
        const newArr = this.state.playlistTracks.filter(e => e.id !== track.id)
        this.setState({ playlistTracks: newArr })
    }

    render() {
        return (
            <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            <div className="App">

                <div className="App-playlist">
                    <SearchResults onAdd={this.addTrack} results={this.state.searchResults} />
                    <PlayList onRemove={this.removeTrack} name={this.state.playlistName} tracks={this.state.playlistTracks} />
                </div>
            </div>
        </div>
        )
    }
}
