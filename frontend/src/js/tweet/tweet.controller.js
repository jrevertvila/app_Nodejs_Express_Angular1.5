import marked from 'marked';
class TweetCtrl {
  constructor( tweet, User, $sce, $rootScope, $scope) {
    'ngInject';

    $scope.tweet = tweet;
    this.tweet = tweet;

    // this.currentUser = User.current;

    $rootScope.setPageTitle("@"+this.tweet.author.username);

    // this.tweet.body = $sce.trustAsHtml(marked(this.tweet.body, { sanitize: true }));
    // console.log(this.tweet);
  }


}


export default TweetCtrl;
