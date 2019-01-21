angular.module('app.controllers')
    .controller('partialSidebarController', ['$scope', '$auth', ($scope, $auth) => {

        $scope.$auth = $auth;
    }]);