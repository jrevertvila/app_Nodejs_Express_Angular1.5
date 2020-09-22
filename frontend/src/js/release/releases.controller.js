class ReleasesCtrl {
    // constructor(releases, User, $sce, $rootScope) { when add jwt login
    constructor(releases, $scope, $sce, $rootScope) {
        'ngInject';

        this.releases = releases;
        $scope.releases = this.releases;

        // this.currentUser = User.current;
        $rootScope.setPageTitle("Releases");
    }  
}

export default ReleasesCtrl;