class TweetsListCtrl {
    constructor($scope, $state, User, Tweets){
        "ngInject";
        this._$scope = $scope;
        this._Tweets = Tweets;
        this._User = User;
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

let TweetsList = {
    bindings: {
        tweets: '='
    },
    controller: TweetsListCtrl,
    templateUrl: 'components/tweets-helpers/tweets-list.html'
};

export default TweetsList;