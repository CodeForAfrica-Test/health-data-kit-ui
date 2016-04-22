
angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ngDialog',
    'restangular',
    'ui.bootstrap',
    'ui.paging',
    'app.controllers'
])

.config(['$stateProvider', '$urlRouterProvider', 'ngDialogProvider', 
  function($stateProvider, $urlRouterProvider, ngDialogProvider) {
  $stateProvider
    .state('home', {
    url: '',
    templateUrl: 'modules/home.html',
    controller: 'appCtrl'
  })

  $urlRouterProvider.otherwise('/home')

  ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-plain',
      showClose: false,
  });
  
}]);