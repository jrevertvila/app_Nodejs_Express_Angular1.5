class MerchCtrl {
    constructor(merch, brands, $sce, $rootScope, Merch) {
        'ngInject';
        this._Merch = Merch;
        this.allMerch = [];
        this.brands = brands['brands'];
        for (let type in merch) merch[type].map((x) => this.allMerch.push(x));
        $rootScope.setPageTitle("Merchandising");
    }

    addWishlist(item) {
        this._Merch.addToWishlist(item.id);
    }
}

export default MerchCtrl;