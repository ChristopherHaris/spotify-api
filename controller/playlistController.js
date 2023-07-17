const Song = require('../model/song');
const fs = require('fs');
const path = require('path');

// Mock data to store the playlist
const playlistFilePath = path.join(__dirname, '../data/playlist.json');

// Load the playlist from the JSON file
let playlist = [];
try {
  const playlistData = fs.readFileSync(playlistFilePath);
  playlist = JSON.parse(playlistData);
} catch (error) {
  console.error('Error loading playlist:', error);
}

// Save the playlist to the JSON file
const savePlaylist = () => {
  try {
    const playlistData = JSON.stringify(playlist, null, 2);
    fs.writeFileSync(playlistFilePath, playlistData);
  } catch (error) {
    console.error('Error saving playlist:', error);
  }
};

// Add song to the playlist
const addSongToPlaylist = (req, res) => {
  const { title, artists, url } = req.body;

  // Create a new song instance
  const song = new Song(title, artists, url);

  // Add the song to the playlist
  playlist.push(song);

  // Save the updated playlist to the JSON file
  savePlaylist();

  res.status(201).json({ message: 'Song added to the playlist.' });
};

// Play song from the playlist
const playSongFromPlaylist = (req, res) => {
  const songIndex = req.params.songIndex;

  // Check if the song index is valid
  if (songIndex >= 0 && songIndex < playlist.length) {
    // Increment the play count for the song
    playlist[songIndex].playCount++;

    res.status(200).json({ message: 'Song played.' });
  } else {
    res.status(404).json({ message: 'Song not found.' });
  }
};

// Get list of songs from the playlist
const getListOfSongs = (req, res) => {
  res.status(200).json(playlist);
};

// Make playlist as model
const getPlaylistAsModel = (req, res) => {
  const playlistModel = playlist.map((song) => ({
    title: song.title,
    artists: song.artists,
    url: song.url,
  }));

  res.status(200).json(playlistModel);
};

// Get list of songs sorted by most played
const getSortedPlaylist = (req, res) => {
  const sortedPlaylist = [...playlist].sort((a, b) => b.playCount - a.playCount);

  res.status(200).json(sortedPlaylist);
};

// Delete a song from the playlist
const deleteSongFromPlaylist = (req, res) => {
  const songIndex = req.params.songIndex;

  // Check if the song index is valid
  if (songIndex >= 0 && songIndex < playlist.length) {
    // Remove the song from the playlist
    playlist.splice(songIndex, 1);

    // Save the updated playlist to the JSON file
    savePlaylist();

    res.status(200).json({ message: 'Song deleted from the playlist.' });
  } else {
    res.status(404).json({ message: 'Song not found.' });
  }
};

module.exports = {
  addSongToPlaylist,
  playSongFromPlaylist,
  getListOfSongs,
  getPlaylistAsModel,
  getSortedPlaylist,
  deleteSongFromPlaylist,
};
