class ReleasesDetailsCtrl {
    constructor($scope, $state){
        "ngInject";
        this._$scope = $scope;
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