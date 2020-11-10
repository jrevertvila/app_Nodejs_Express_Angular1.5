class ProfileArticlesCtrl {
  constructor(profile, $state, $rootScope) {
    'ngInject';

    // The profile for this page, resolved by UI Router
    this.profile = profile;

    this.profileState = $state.current.name.replace('app.profile.', '');

    this.listConfigWishlist = {
      type: 'all',
      mode: 'userWishlist',
      username: this.profile.username
  };

    this.listConfig = { type: 'all' };

    if (this.profileState === 'main') {
      this.listConfig.filters = { author: this.profile.username };


      $rootScope.setPageTitle('@' + this.profile.username);

    } else if (this.profileState === 'favorites') {
      this.listConfig.filters = { favorited: this.profile.username };

      $rootScope.setPageTitle(`Tweets favorited by ${this.profile.username}`);


    } else if (this.profileState === 'wishlist') {
      this.listConfig.filters = { favorited: this.profile.username };

      $rootScope.setPageTitle(`Wishlist - ${this.profile.username}`);
    }

  }
}

export default ProfileArticlesCtrl;
