class TweetPreviewCtrl {
    constructor($scope, $state, User, Tweets) {
        "ngInject";
        this._$scope = $scope;
        // this._Tweets = Tweets;
        this._User = User;
        this._Tweets = Tweets;
        this.$onInit = function () {
            if (this._User.current) this.canModify = (this._User.current.username == this.tweet.author.username ? true : false);
            console.log(this.tweet);
        };

    }

    deleteTweet() {
        console.log("hola");
        // console.log();
        this._Tweets.destroy(this.tweet.slug).then(() => {
            location.reload();
        })
    }

}

let TweetPreview = {
    bindings: {
        tweet: '='
    },
    controller: TweetPreviewCtrl,
    templateUrl: 'components/tweets-helpers/tweet-preview.html'
};

export default TweetPreview;