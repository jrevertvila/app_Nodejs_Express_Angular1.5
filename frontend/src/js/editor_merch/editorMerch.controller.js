class EditorMerchCtrl {
  constructor($state, User, Merch, item, Brand, brands, Toastr) {
    'ngInject';

    this._Merch = Merch;
    this._Brand = Brand;
    this._$state = $state;
    this._toastr = Toastr;
    this.currentUser = User.current;
    this.brand = {
      name: '',
      description: '',
      web: ''
    };
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
    if (this.brand.name != '' && this.brand.name != undefined) {
      this._Brand.createBrand(this.brand).then( //Averiguar porque no entra al then
        (success) => {
          console.log("THEEEEEN");
          this._toastr.showToastr("success", "Brand created");
          console.log(success);
          setTimeout(() => { location.reload() }, 1000);
        }),
        (err) => {
          this._toastr.showToastr("error", "Error: Cannot create brand");
          setTimeout(() => { location.reload() }, 1000);
        }
    } else {
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
