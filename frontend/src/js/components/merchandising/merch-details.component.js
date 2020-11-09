class MerchDetailsCtrl {
    constructor($scope, $state, User, Merch){
        "ngInject";
        this._User = User;
        this._Merch = Merch;
        this._$state = $state;
        this._$scope = $scope;
        // this.$onInit = function () {
        //     if (this._User.current) this.canModify = (this._User.current.username == this.release.author.username ? true : false);
        // };
    }

    // removeItem(){
    //     this._Merch.destroy(this.item.slug).then(() => {
    //         this._$state.go('app.merch')
    //     })
    // }
}

let MerchDetails = {
    bindings: {
        item: '='
    },
    controller: MerchDetailsCtrl,
    templateUrl: 'components/merchandising/merch-details.html'
};

export default MerchDetails;