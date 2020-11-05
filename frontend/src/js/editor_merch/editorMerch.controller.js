class EditorMerchCtrl {
  constructor($state, User, Merch, item, Brand, brands) {
    'ngInject';

    this._Merch = Merch;
    this._Brand = Brand;
    this._$state = $state;
    this.currentUser = User.current;
    this.brand = {
      name: '',
      description: '',
      web: ''
    };
    console.log(brands['brands']);
    this.allBrands = brands['brands'];


    if (!item) {
      this.item = {
        title: '',
        description: '',
        body: '',
        tagList: [],
        version: ''
      }
    } else {
      this.isEdit = true;
      this.item = item;
    }
  }
  submitBrand() {
    console.log(this.brand);
    if (this.brand.name != '' && this.brand.name != undefined){
      this._Brand.createBrand(this.brand).then((result) => {
        console.log("ADDED");
        console.log(result);
        // this._$state.go('app.merch');
      })
    }else{
      console.log("ERROR");
    }
        
  }

  deleteBrand(slug) {
    console.log(slug);
    this._Brand.deleteBrand(slug).then((result) => {
      console.log(result);
      // location.reload();
    })
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
