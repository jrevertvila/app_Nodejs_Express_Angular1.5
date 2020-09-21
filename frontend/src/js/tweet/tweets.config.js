function TweetsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.tweets', {
    url: '/tweet/:slug',
    controller: 'TweetCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'tweet/tweet.html',
    title: 'Tweet',
    resolve: {
      tweet: function(Tweets, $state, $stateParams) {
        return Tweets.get($stateParams.slug).then(
          (tweet) => tweet,
          (err) => $state.go('app.home')
        )
      }
    }
  });

};

export default TweetsConfig;
