class TweetsListCtrl {
    constructor($scope, $state, User, Tweets){
        "ngInject";
        this._$scope = $scope;
        this._Tweets = Tweets;
        this._User = User;
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