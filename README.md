# Spotify Playlist Server

This is a simple Spotify playlist server that allows you to manage and play songs from a playlist. It provides basic functionality such as adding songs to the playlist, playing songs, retrieving the list of songs, and more.

## Installation

1. Clone the repository or download the project files.
2. Install the project dependencies by running the following command:

   ```shell
   npm install

## Usage

1. Start the server by running the following command:

   ```shell
    Node server.js

The server will start running on port 3000.

2. Use a tool like Postman to interact with the server API endpoints. Here are the available endpoints:

- POST /playlist: Add a song to the playlist.
- GET /playlist: Get the list of songs in the playlist.
- GET /playlist/:songIndex/play: Play a song from the playlist.
- GET /playlist/model: Get the playlist as a model.
- GET /playlist/sorted: Get the list of songs sorted by most played.
- DELETE /playlist/:songIndex: Delete a song from the playlist.
