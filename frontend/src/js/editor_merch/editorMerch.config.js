function EditorMerchConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.editorMerch', {
      url: '/mercheditor/:slug',
      controller: 'EditorMerchCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'editor_merch/editorMerch.html',
      title: 'Editor Merch',
      resolve:{
        auth: function(User) {
          return User.ensureAuthIs(true);
        },
        item: function($stateParams) {
          if ($stateParams.slug) {
            
          } else {
            return null;
          }
        },
        brands: function (Brand) {
          return Brand.getAll().then(
            (brands) => brands,
          )
        }
      }
    });
  
  };
  
  export default EditorMerchConfig;
  