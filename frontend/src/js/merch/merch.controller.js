class MerchCtrl {
    constructor( merch, brands, $sce, $rootScope) {
        'ngInject';
        this.allMerch = [];
        this.brands = brands['brands'];
        for (let type in merch) merch[type].map((x) => this.allMerch.push(x));
        $rootScope.setPageTitle("Merchandising");
    }  
}

export default MerchCtrl;