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
        // releases: function(Releases) {
        //   return Releases.getReleases().then(
        //     (releases) => releases,
        //   )
        // }
      }
    });

  
  };
  
  export default MerchConfig;
  