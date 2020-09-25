class SocialCtrl {
    constructor(User, $state, $scope) {
      'ngInject';

      console.log("socialCtrl dentro");
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
  
      // this.title = $state.current.title;
      // this.authType = $state.current.name.replace('app.', '');
      console.log("SOCIAL LOGIN CTRL");
    }
  }
  export default SocialCtrl;