class MerchPreviewCtrl {
    constructor($state, User, Merch) {
        "ngInject";
        this._User = User;
        this._Merch = Merch;
        this.$onInit = function () {
            this._item = this.item;
        };
        
    }

    addWishlist(item) {
        this._Merch.addToWishlist(item.id);
    }

}

let MerchPreview = {
    bindings: {
        item: '='
    },
    controller: MerchPreviewCtrl,
    templateUrl: 'components/merchandising/merch-preview.html'
};

export default MerchPreview;