class TweetActionsCtrl {
    constructor($scope, $state, User, Tweets){
        "ngInject";
        this._$scope = $scope;
        this._Tweets = Tweets;
        this._User = User;
        this.$onInit = function () {
            if (this._User.current) this.canModify = (this._User.current.username == this.tweet.author.username ? true : false);
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

let TweetActions = {
    bindings: {
        tweet: '='
    },
    controller: TweetActionsCtrl,
    templateUrl: 'components/tweets-helpers/actions/tweet-actions.html'
};

export default TweetActions;