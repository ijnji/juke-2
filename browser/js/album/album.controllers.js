/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, StatsFactory, AlbumFactory, PlayerFactory) {

  // load our initial data
  AlbumFactory.fetchAll()
  .then(function (albums) {
    return AlbumFactory.fetchById(albums[0].id); // temp: get one
  })
  .then(function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song.id + '/audio';
      song.albumIndex = i;
    });
    $scope.album = album;
    StatsFactory.totalTime(album)
    .then(function(albumDuration) {
      var hr = Math.floor(albumDuration / 3600);
      var mm = Math.floor((albumDuration - (hr * 3600))/ 60);
      var ss = Math.floor(albumDuration % 60);
      $scope.fullDuration = '(' +
                            (hr > 0 ? hr + ' hrs ' : '') +
                            (mm > 0 ? mm + ' min ' : '') +
                            (ss > 0 ? ss + ' sec' : '') +
                            ')';
    });
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle
  $scope.toggle = function (song) {
    if (song === PlayerFactory.getCurrentSong() && PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    } else if (song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, $scope.album.songs);
    }
  };

  // Scope Variables
  $scope.playing = function(){
    return PlayerFactory.isPlaying();
  };
  $scope.currentSong = function(){
    return PlayerFactory.getCurrentSong();
  };
});




juke.controller('AlbumsCtrl', function($scope, $rootScope, AlbumFactory) {
  AlbumFactory.fetchAll()
  .then(function(albums) {
    $scope.albums = albums;
    albums.forEach(function(album) {
      album.imageUrl = '/api/albums/' + album.id + '/image';
    });
  });

  $rootScope.$on('showAllAlbums', function() {
    $scope.showMe = true;
  });
});