class TweetPreviewCtrl {
    constructor($scope, $state, User){
        "ngInject";
        this._$scope = $scope;
        // this._Tweets = Tweets;
        this._User = User;
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