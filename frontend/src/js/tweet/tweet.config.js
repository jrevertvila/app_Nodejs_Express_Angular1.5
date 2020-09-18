function TweetConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.tweet', {
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
      },
      test: function(Tweets, $state, $stateParams) {
        console.log("ola");
console.log(Tweets);
        // return Tweets.get($stateParams.slug).then(
        //   (tweet) => tweet,
        //   (err) => $state.go('app.home')
        // )
      }
    }
  });

};

export default TweetConfig;
