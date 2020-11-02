class MerchCtrl {
    // constructor(releases, User, $sce, $rootScope) { when add jwt login
    constructor( $sce, $rootScope) {
        'ngInject';

        $rootScope.setPageTitle("Merchandising");
    }  
}

export default MerchCtrl;