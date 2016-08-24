'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var playerObj = {};

  // State
  playerObj.playing = false;

  playerObj.audio = document.createElement('audio');

  playerObj.audio.addEventListener('timeupdate', function() {
    playerObj.progress = 100 * playerObj.audio.currentTime / playerObj.audio.duration;
    $rootscope.$evalasync();
  });

  playerObj.start = function(song, songList) {
    if(songList) {
      this.songList = songList;
    }

    // stop existing audio (e.g. other song) in any case
    this.pause();
    this.playing = true;

    // resume current song
    if (song === this.currentSong) return this.audio.play();

    // enable loading new song
    this.currentSong = song;
    this.audio.src = song.url;
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
    if (!this.songList) return;
    this.pause();
    var i = this.songList.indexOf(this.currentSong) + 1;
    if (i > this.songList.length - 1) i = 0;
    this.start(this.songList[i]);
  };
  playerObj.previous = function() {
    if (!this.songList) return;
    this.pause();
    var i = this.songList.indexOf(this.currentSong) - 1;
    if (i < 0) i = this.songList.length - 1;
    this.start(this.songList[i]);
  };
  playerObj.getProgress = function() {
    if (!this.currentSong) return 0;
    return this.progress;
  };

  return playerObj;
});
