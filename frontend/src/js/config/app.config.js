// import authInterceptor from './auth.interceptor'
function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'layout/app-view.html',
    resolve: {
        appConf: function(){
          // console.log($urlRouterProvider);
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
