function EditorReleasesConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.editorReleases', {
      url: '/editorReleases/:slug',
      controller: 'EditorReleasesCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor_releases/editorReleases.html',
      title: 'Editor Releases',
      resolve:{
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        release: function(Releases, User, $state, $stateParams) {
  
          if ($stateParams.slug) {
  
            return Releases.get($stateParams.slug).then(
              (release) => {
                if (User.current.username === release.author.username) {
                  return release;
                } else {
                  $state.go('app.home');
                }
              },
              (err) => $state.go('app.home')
            )
  
          } else {
            return null;
          }
  
        }
      }
    });
  
  };
  
  export default EditorReleasesConfig;
  