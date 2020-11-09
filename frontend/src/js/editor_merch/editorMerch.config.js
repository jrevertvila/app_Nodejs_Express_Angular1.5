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
        auth: function(User) { //Cannot enter if u aren't logged
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
        },
        categories: function (Category) {
          return Category.getAll().then(
            (categories) => categories,
          )
        }
      }
    });
  
  };
  
  export default EditorMerchConfig;
  