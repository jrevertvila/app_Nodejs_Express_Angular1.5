class HomeCtrl {
  constructor(User,tweets, Tags, AppConstants, $scope) {
    'ngInject';

    $scope.tweets = tweets;
    this.appName = AppConstants.appName;
    this._$scope = $scope;
    console.log(tweets);
    // Get list of all tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  // changeList(newList) {
  //   this._$scope.$broadcast('setListTo', newList);
  // }

    // mgTweet(slug) {
    //   this._$scope.$broadcast('setListTo', newList);
    // }


}

export default HomeCtrl;
