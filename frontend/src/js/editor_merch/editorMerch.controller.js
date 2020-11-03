class EditorMerchCtrl {
  constructor($state, User, Merch) {
    'ngInject';
    // console.log(item);
    // this._Merch = Merch;
    // this._$state = $state;
    // this.currentUser = User.current;
    // console.log(this.currentUser);


    // if (!release) {
    //   this.release = {
    //     title: '',
    //     description: '',
    //     body: '',
    //     tagList: [],
    //     version: ''
    //   }
    // } else {
    //   this.isEdit = true;
    //   this.release = release;
    // }

  }

  // submit() {
  //   this.isSubmitting = true;
  //   console.log(this.release);
  //   this._Releases.save(this.release).then(
  //     (newRelease) => {
  //       this._$state.go('app.releases', { slug: newRelease.slug });
  //     },

  //     (err) => {
  //       this.isSubmitting = false;
  //       this.errors = err.data.errors;
  //     }

  //   )
  // }



}


export default EditorMerchCtrl;
