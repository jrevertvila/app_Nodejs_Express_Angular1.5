function EditorMerchConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.editorMerch', {
      url: '/merch/editor/:slug',
      controller: 'EditorMerchCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor_merch/editorMerch.html',
      title: 'Editor Merch',
      resolve:{
        // auth: function(User) {
        //   return User.ensureAuthIs(true);
        // },
        item: function($stateParams) {
          console.log("dins de item resolve");
          console.log($stateParams);
          if ($stateParams.slug) {
            
            console.log($stateParams.slug);
            // return Releases.get($stateParams.slug).then(
            //   (release) => {
            //     if (User.current.username === release.author.username) {
            //       return release;
            //     } else {
            //       $state.go('app.home');
            //     }
            //   },
            //   (err) => $state.go('app.home')
            // )
  
          } else {
            return null;
          }
  
        }
      }
    });
  
  };
  
  export default EditorMerchConfig;
  