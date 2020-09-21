function HomeConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'home/home.html',
    title: 'Home',
    resolve: {
      tweets: function(Tweets) { 
        console.log(Tweets.getTweets());
        return Tweets.getTweets().then(
          (Tweets) => Tweets,
        )
      }
    }
  });

};

export default HomeConfig;
