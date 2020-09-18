// import authInterceptor from './auth.interceptor'
console.log("APP.CONFIG.JS");
function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  // $httpProvider.interceptors.push(authInterceptor);

  /*
    If you don't want hashbang routing, uncomment this line.
    Our tutorial will be using hashbang routing though :)
  */
  // $locationProvider.html5Mode(true);

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve: {
        appConf: function(){
          console.log($urlRouterProvider);
        }
      // auth: function(User) {
      //   console.log("interceptor")
      //   return User.verifyAuth();
      // }
    }
  });

  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
