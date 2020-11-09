function MerchConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.merch', {
      url: '/merch',
      controller: 'MerchCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'merch/MainPage.html',
      title: 'Merchandising',
      resolve: {
        merch: function (Merch) {
          return Merch.getAll().then(
            (merch) => merch,
          )
        },
        brands: function (Brand) {
          return Brand.getAll().then(
            (brands) => brands,
          )
        },
        wishlisted: function (Merch) {
          return Merch.getWishlisted().then(
            (wishlisted) => wishlisted,
          )
        }
      }
    })

    .state('app.item', {
      url: '/merch/:type/:slug',
      controller: 'ItemCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'merch/item.html',
      title: 'Item',
      resolve: {
        item: function (Merch, $stateParams) {
          return Merch.get({ data: $stateParams}).then( (merch) => merch )
        }

      }
    });


};

export default MerchConfig;
