class TweetFavCtrl {
    constructor(User, $state, Tweets) {
        "ngInject";
        this._User = User;
        this._Tweets = Tweets;
        this._$state = $state;

        this.$onInit = function(){
          console.log(this.tweet);
        }
        // this.tweet = tweet;
        // console.log(this.tweet);
    }

    mgTweet() {
        this.isSubmitting = true;
    console.log("hola");
        if (!this._User.current) {
          this._$state.go('app.register');
          return;
        }
        console.log(this.tweet);
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
    transclude: true,
    controller: TweetFavCtrl,
    templateUrl: 'components/tweets-helpers/actions/tweet-fav.html'
};

export default TweetFav;