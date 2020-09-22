class ReleaseCtrl {
    // constructor(release, User, $sce, $rootScope) { when add jwt login
    constructor(release, releases, $scope, $sce, $rootScope) {
        'ngInject';

        this.releases = releases;
        $scope.releases = this.releases;
        
        this.release = release;
        $scope.release = this.release;

        // this.currentUser = User.current;
        $rootScope.setPageTitle(this.release.author.username);
    }  
}

export default ReleaseCtrl;