class TweetFavCtrl {
    constructor(User, $state, Tweets) {
        "ngInject";
        this._User = User;
        this._Tweets = Tweets;
        this._$state = $state;
        // console.log(tweet);
        // this.tweet = tweet;
    }

    mgTweet() {
        this.isSubmitting = true;
    
        if (!this._User.current) {
          this._$state.go('app.register');
          return;
        }
    
        if (this.tweet.favorited) {
          this._Tweets.unfavorite(this.tweet.slug).then(
            () => {
              this.isSubmitting = false;
              this.tweet.favorited = false;
              this.tweet.favoritesCount--;
            }
          )
    
        } else {
          this._Tweets.favorite(this.tweet.slug).then(
            () => {
              this.isSubmitting = false;
              this.tweet.favorited = true;
              this.tweet.favoritesCount++;
            }
          )
        }
    
      }
}

let TweetFav = {
    bindings: {
        tweet: '='
    },
    controller: TweetFavCtrl,
    templateUrl: 'components/tweets-helpers/tweet-fav.html'
};

export default TweetFav;