class TweetsListCtrl {
    constructor($scope, $state, Tweets) { //User borrado (probar)
        "ngInject";
        this._$scope = $scope;
        this._Tweets = Tweets;

        this.$onInit = () => {
            this.setListTo(this.listConfig);
        }

        $scope.$on('setListTo', (ev, newList) => {
            this.setListTo(newList);
        });

        $scope.$on('setPageTo', (ev, pageNumber) => {
            this.setPageTo(pageNumber);
        });
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

        this._Tweets
            .query(queryConfig)
            .then(
                (res) => {
                    this.loading = false;
                    this.list = res.tweets;
                    this.listConfig.totalPages = Math.ceil(res.tweetsCount / this.limit);
                }
            );
    }
}

let TweetsList = {
    bindings: {
        limit: '=',
        // tweets: '=',
        listConfig: '='
    },
    controller: TweetsListCtrl,
    templateUrl: 'components/tweets-helpers/tweets-list.html'
};

export default TweetsList;