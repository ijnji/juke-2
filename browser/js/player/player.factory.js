'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var playerObj = {};

  // State
  playerObj.currentSong;
  playerObj.playing = false;
  playerObj.songList;

  playerObj.audio = document.createElement('audio');

  playerObj.start = function(song, songList) {
    this.songList = songList;

    // stop existing audio (e.g. other song) in any case
    this.pause();
    this.playing = true;

    // resume current song
    if (song === this.currentSong) return this.audio.play();

    // enable loading new song
    this.currentSong = song;
    this.audio.src = song.audioUrl;
    this.audio.load();
    this.audio.play();
  };
  playerObj.pause = function() {
    if (!this.audio) return;
    this.audio.pause();
    this.playing = false;
  };
  playerObj.resume = function() {
    if (!this.audio) return;
    this.audio.play();
    this.playing = true;
  };
  playerObj.isPlaying = function() {
    return this.playing;
  };
  playerObj.getCurrentSong = function() {
    if (!this.currentSong) return null;
    return this.currentSong;
  };
  playerObj.next = function() {
    this.pause();
    if (!this.songList) return;
    var i = this.songList.indexOf(this.currentSong) + 1;
    if (i > this.songList.length - 1) i = 0;
    this.start(this.songList[i], this.songList);
  };
  playerObj.previous = function() {
    this.pause();
    if (!this.songList) return;
    var i = this.songList.indexOf(this.currentSong) - 1;
    if (i < 0) i = this.songList.length - 1;
    this.start(this.songList[i], this.songList);
  };
  playerObj.getProgress = function() {
    if (!this.currentSong) return 0;
    return this.audio.currentTime / this.audio.duration;
  };
  return playerObj;
});
