class ReleasesDetailsCtrl {
    constructor($scope, $state, User, Releases){
        "ngInject";
        this._User = User;
        this._Releases = Releases;
        this._$state = $state;
        this._$scope = $scope;
        this.$onInit = function () {
            if (this._User.current) this.canModify = (this._User.current.username == this.release.author.username ? true : false);
        };
    }

    removeRelease(){
        this._Releases.destroy(this.release.slug).then(() => {
            this._$state.go('app.releases')
        })
    }
}

let ReleasesDetails = {
    bindings: {
        release: '='
    },
    controller: ReleasesDetailsCtrl,
    templateUrl: 'components/releases-helpers/releases-details.html'
};

export default ReleasesDetails;