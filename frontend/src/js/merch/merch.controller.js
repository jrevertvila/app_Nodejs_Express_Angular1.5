class MerchCtrl {
    constructor(brands, $sce, $rootScope, Merch, $stateParams) {
        'ngInject';
        this._Merch = Merch;
        this.allMerch = [];
        this.brands = brands['brands'];
        // this.allWishlisted = wishlisted['wishlisted'];
        
        // for (let type in merch) merch[type].map((x) => this.allMerch.push(x));

        this.$onInit = function () {
            if (!$stateParams.filter) {
                this.listConfig = {
                    type: 'all',
                    mode: 'all'
                };

                this.listConfigWishlist = {
                    type: 'all',
                    mode: 'wishlisted'
                };
            } else {
                this.listConfig = {
                    filters: { tag: $stateParams.filter }
                };
            }

        };

        $rootScope.setPageTitle("Merchandising");
    }

    addWishlist(item) {
        this._Merch.addToWishlist(item.id);
    }

    changeList(newList) {
        this._$scope.$broadcast('setListTo', newList);
    }
}

export default MerchCtrl;