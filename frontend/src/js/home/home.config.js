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
        return Tweets.getTweets().then(
          (Tweets) => Tweets,
        )
      },

      releases: function(Releases) {
        return Releases.getReleases().then(
          (releases) => releases,
        )
      }
    }
  });

};

export default HomeConfig;
