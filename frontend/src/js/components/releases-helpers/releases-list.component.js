class ReleasesListCtrl {
    constructor($scope, $state){
        "ngInject";
        this._$scope = $scope;
    }
}

let ReleasesList = {
    bindings: {
        releases: '='
    },
    controller: ReleasesListCtrl,
    templateUrl: 'components/releases-helpers/releases-list.html'
};

export default ReleasesList;