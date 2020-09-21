class TweetsListCtrl {
    constructor($scope, $state){
        "ngInject";
        this._$scope = $scope;
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