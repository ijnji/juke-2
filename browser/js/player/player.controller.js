/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  // main toggle
  $scope.toggle = function () {
    if ($scope.playing()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);


  // outgoing events (to Album… or potentially other characters)
  $scope.next = function(){
    PlayerFactory.next();
  };
  $scope.prev = function(){
    return PlayerFactory.previous();
  };
  $scope.playing = function(){
    return PlayerFactory.isPlaying();
  };
  $scope.currentSong = function(){
    return PlayerFactory.getCurrentSong();
  };

  $scope.getProgress = function() {
    return PlayerFactory.getProgress();
  };

  function seek (decimal) {
    audio.currentTime = audio.duration * decimal;
  };

  $scope.handleProgressClick = function (evt) {
    seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
