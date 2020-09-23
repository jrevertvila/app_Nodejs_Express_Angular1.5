function EditorTweetsConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.editorTweets', {
      url: '/editorTweets/:slug',
      controller: 'EditorTweetsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor_tweets/editorTweets.html',
      title: 'Editor Tweets',
      resolve:{
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        tweet: function(Tweets, User, $state, $stateParams) {
  
          if ($stateParams.slug) {
  
            return Tweets.get($stateParams.slug).then(
              (tweet) => {
                if (User.current.username === tweet.author.username) {
                  return tweet;
                } else {
                  $state.go('app.home');
                }
              },
              (err) => $state.go('app.home')
            )
  
          } else {
            return null;
          }
  
        }
      }
    });
  
  };
  
  export default EditorTweetsConfig;
  