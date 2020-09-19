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
          (tweet) => tweet
        )
      }
      // ,all: function() {
      //   console.log("ola");
      //   console.log(Tweets);
      //   return Tweets.get().then(
      //     (tweet) => tweet
      //   )
      // }
    }
  })
  .state('app.tweets', {
    url: '/tweets',
    controller: 'TweetsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'tweet/tweet2.html',
    title: 'Tweets',
    resolve: {
      
      tweets: function(Tweets, $state, $stateParams) {
        console.log("AAAAAAAAA");
        console.log(Tweets);
        return Tweets.get().then(
          (tweets) => tweets
        )
      }
    }
  });

};

export default TweetConfig;
