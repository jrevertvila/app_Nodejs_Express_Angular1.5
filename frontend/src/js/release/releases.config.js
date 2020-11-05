function ReleasesConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.releases', {
      url: '/releases/:filter',
      controller: 'ReleasesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'release/releases.html',
      title: 'Releases',
      resolve: {
        releases: function(Releases) {
          return Releases.getReleases().then(
            (releases) => releases,
          )
        },
        tags: function(Tags) {
          return Tags.getAll().then(
            (tags) => tags,
          )
        }

      }
    })

    .state('app.release', {
      url: '/release/:slug',
      controller: 'ReleaseCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'release/release.html',
      title: 'Release',
      resolve: {
        release: function(Releases, $state, $stateParams) {
          return Releases.get($stateParams.slug).then(
            (release) => release,
          )
        },
        releases: function(Releases) {
          return Releases.getReleases().then(
            (releases) => releases,
          )
        }
      }
    });
  
  };
  
  export default ReleasesConfig;
  