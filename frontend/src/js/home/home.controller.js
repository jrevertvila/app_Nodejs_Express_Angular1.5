class HomeCtrl {
  constructor(User,tweets, releases, Tags, AppConstants, $scope) {
    'ngInject';

    this.tweets = tweets;
    $scope.tweets = this.tweets;

    this.releases = releases;
    $scope.releases = this.releases;

    this.appName = AppConstants.appName;
    this._$scope = $scope;

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
