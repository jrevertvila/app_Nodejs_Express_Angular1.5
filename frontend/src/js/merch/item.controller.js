class ItemCtrl {
    // constructor(release, User, $sce, $rootScope) { when add jwt login
    constructor(item, $sce, $rootScope) {
        'ngInject';

        this.item = Object.values(item)[0]; //Get first property of object
        
        // this.currentUser = User.current;
        $rootScope.setPageTitle(this.item.name);
    }  
}

export default ItemCtrl;