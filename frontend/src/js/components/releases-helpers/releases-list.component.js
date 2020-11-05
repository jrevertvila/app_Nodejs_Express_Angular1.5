class ReleasesListCtrl {
    constructor($scope,Releases){
        "ngInject";

        this._Releases = Releases;

        this.$onInit = () => {
            if(this.releases){
                this.list = this.releases.slice(0, 3); //Solo muestra las 3 ultimas releases si le pasas el data por resolve. Se utiliza en el widget de home para poder reutilizarlo.
            }else{  //Problema de compatibilidad con la paginación de tweets en home. Por ende se añade este IF para resolver conflictos.
                this.setListTo(this.listConfig);
                console.log(this.listConfig);
                // if (this.listConfig.filters.tag) {
                //     this
                // }

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
        this._Releases
            .query(queryConfig)
            .then(
                (res) => {
                    this.loading = false;
                    this.list = res.releases;
                    this.listConfig.totalPages = Math.ceil(res.releasesCount / this.limit);
                }
            );
    }
}

let ReleasesList = {
    bindings: {
        limit: '=',
        listConfig: '=',
        releases: '='
    },
    controller: ReleasesListCtrl,
    templateUrl: 'components/releases-helpers/releases-list.html'
};

export default ReleasesList;