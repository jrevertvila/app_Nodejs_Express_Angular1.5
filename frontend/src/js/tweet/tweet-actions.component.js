class TweetActionsCtrl {
  constructor(Tweets, User, $state) {
    'ngInject';

    this._Tweets = Tweets;
    this._$state = $state;

    if (User.current) {
      this.canModify = (User.current.username === this.tweet.author.username);
    } else {
      this.canModify = false;
    }

  }

  deleteTweet() {
    this.isDeleting = true;
    this._Tweets.destroy(this.tweet.slug).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    )
  }
}

let TweetActions = {
  bindings: {
    tweet: '='
  },
  controller: TweetActionsCtrl,
  templateUrl: 'tweet/tweet-actions.html'
};

export default TweetActions;
