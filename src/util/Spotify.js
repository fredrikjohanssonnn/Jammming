
const clientID = 'af2f38929ac647df8657c84d69724bda'
const redirectURI = 'http://localhost:3000/'
const apiUrl = 'https://accounts.spotify.com/authorize'

let accessToken;

let Spotify = {

    getAccessToken(){
        if (accessToken){
            return accessToken
        }
        
        const accessMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        if (accessMatch && expiresMatch){
            accessToken = accessMatch[1]
            const expiresIn = Number(expiresMatch[1]);

            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const url = `${apiUrl}?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = url
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
          .then(response => response.json())
          .then(jsonResponse => {
            if (!jsonResponse.tracks) {
              return [];
            }
            return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }));
          });
      },

    savePlaylist(name, trackURIs){
        if (name && trackURIs) {
            const accessToken = Spotify.getAccessToken();
            const headers = {
              Authorization: `Bearer ${accessToken}`
            };
            let userId;

            return fetch('https://api.spotify.com/v1/me', { headers: headers })
          .then(response => response.json())
          .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ name: name })
            })
              .then(response => response.json())
              .then(jsonResponse => {
                //Store playlist ID
                const playlistId = jsonResponse.id;

                return fetch(
                  `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                  {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                  }
                );
              });
          });
      } else {
        return;
      }
    },
}

export default Spotify