class EditorReleasesCtrl {
    constructor($scope, $state, User, Releases, release) {
      'ngInject';
  
      this._Releases = Releases;
      this._$state = $state;
      this._$scope = $scope;
      // console.log(User.current)
      this.currentUser = User.current;
      console.log(this.currentUser);
      console.log(release);
  
      if (!release) {
        this.release = {
          title: '',
          description: '',
          body: '',
          version: ''
        }
      } else {
        this.release = release;
      }
  
    }
  
    submit() {
      this.isSubmitting = true;
      console.log(this.release);
      this._Releases.save(this.release).then(
        (newRelease) => {
          this._$state.go('app.releases', { slug: newRelease.slug });
        },
  
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
        }
  
      )
    }
  
  
  
  }
  
  
  export default EditorReleasesCtrl;
  