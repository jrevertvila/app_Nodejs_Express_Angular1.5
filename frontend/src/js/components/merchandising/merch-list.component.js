class MerchListCtrl {
    constructor($scope, Merch) {
        "ngInject";

        this._Merch = Merch;
        this._mode = this.mode;
        this.$onInit = () => {
            if (this.items) {
                this.list = this.items;
            } else {  //Problema de compatibilidad con la paginación de tweets en home. Por ende se añade este IF para resolver conflictos.
                this.setListTo(this.listConfig);

                $scope.$on('setListTo', (ev, newList) => {
                    this.setListTo(newList);
                });

                $scope.$on('setPageTo', (ev, pageNumber) => {
                    this.setPageTo(pageNumber);
                });
            }
        }
    }

    setListTo(newList) {
        this.list = [];
        this.listConfig = newList;
        this.runQuery();
    }

    setPageTo(pageNumber) {
        this.listConfig.currentPage = pageNumber;

        this.runQuery();
    }


    runQuery() {
        this.loading = true;
        this.listConfig = this.listConfig || {};
        let queryConfig = {
            type: this.listConfig.type || undefined,
            filters: this.listConfig.filters || {}
        };
        queryConfig.filters.limit = this.limit;

        if (!this.listConfig.currentPage) {
            this.listConfig.currentPage = 1;
        }
        queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
        if (this.listConfig.mode == undefined || this.listConfig.mode == "all") {
            this._Merch
                .query(queryConfig)
                .then(
                    (res) => {
                        this.loading = false;
                        this.list = res.items;
                        this.listConfig.totalPages = Math.ceil(res.itemsCount / this.limit);
                    }
                );
        } else {
            this._Merch
                .getWishlisted(queryConfig)
                .then(
                    (res) => {
                        this.loading = false;
                        this.list = res.wishlisted;
                        this.listConfig.totalPages = Math.ceil(res.itemsCount / this.limit);
                    }
                );
        }

    }
}

let MerchList = {
    bindings: {
        limit: '=',
        listConfig: '=',
        items: '='
    },
    controller: MerchListCtrl,
    templateUrl: 'components/merchandising/merch-list.html'
};

export default MerchList;