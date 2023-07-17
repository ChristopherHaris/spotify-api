const express = require('express');
const bodyParser = require('body-parser');
const playlistController = require('./controller/playlistController');

// Create an instance of Express.js
const app = express();

// Enable JSON parsing for request bodies
app.use(bodyParser.json());

// Add song to the playlist
app.post('/playlist', playlistController.addSongToPlaylist);

// Play song from the playlist
app.get('/playlist/:songIndex/play', playlistController.playSongFromPlaylist);

// Get list of songs from the playlist
app.get('/playlist', playlistController.getListOfSongs);

// Make playlist as model
app.get('/playlist/model', playlistController.getPlaylistAsModel);

// Get list of songs sorted by most played
app.get('/playlist/sorted', playlistController.getSortedPlaylist);

// Delete song from the playlist
app.delete('/playlist/:songIndex', playlistController.deleteSongFromPlaylist);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
