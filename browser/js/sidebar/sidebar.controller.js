/* global juke */
'use strict';

juke.controller('SidebarCtrl', function($scope, $rootScope) {
  $scope.showAlbums = function() {
    $rootScope.$broadcast('showAllAlbums');
  };
});