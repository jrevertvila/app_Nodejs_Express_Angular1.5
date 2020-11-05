class ReleasesCtrl {
    // constructor(releases, User, $sce, $rootScope) { when add jwt login
    constructor(releases, $scope, $sce, $rootScope, tags, $stateParams) {
        'ngInject';

        this.releases = releases;
        $scope.releases = this.releases;
        this.tags = tags;
        console.log(this.tags);

        this.$onInit = function () {
            if (!$stateParams.filter) {
                this.listConfig = {
                    type: 'all'
                };
            } else {
                this.listConfig = {
                    filters: { tag: $stateParams.filter }
                };
            }

        };

        // this.currentUser = User.current;
        $rootScope.setPageTitle("Releases");
    }

    changeList(newList) {
        this._$scope.$broadcast('setListTo', newList);
    }
}

export default ReleasesCtrl;