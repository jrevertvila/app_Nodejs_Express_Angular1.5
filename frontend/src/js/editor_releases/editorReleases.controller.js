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
          tagList: [],
          version: ''
        }
      } else {
        this.isEdit = true;
        this.release = release;
      }
  
    }

    addTag() {
      if (!this.release.tagList.includes(this.tagField)) {
        console.log(this.tagField);
        this.release.tagList.push(this.tagField);
        console.log(this.release);
        this.tagField = '';
      }
      
    }
  
    removeTag(tagName) {
      this.release.tagList = this.release.tagList.filter((slug) => slug != tagName);
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
  