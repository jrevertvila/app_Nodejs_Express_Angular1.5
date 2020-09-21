import marked from 'marked';
class TweetsCtrl {
  // constructor(tweet, User, $sce, $rootScope) {
  constructor(tweets, $sce, $rootScope) {
    'ngInject';

    this.tweets = tweets;
    console.log("aaaaaaaaaaaaaaa");
    // this.currentUser = User.current;

    $rootScope.setPageTitle("Tweets");

    // this.tweet.body = $sce.trustAsHtml(marked(this.tweet.body, { sanitize: true }));
    // console.log(this.tweets);
  }


}


export default TweetsCtrl;
