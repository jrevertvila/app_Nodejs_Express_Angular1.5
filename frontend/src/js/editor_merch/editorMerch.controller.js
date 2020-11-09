class EditorMerchCtrl {
  constructor($state, User, Merch, item, Brand, brands, Toastr, categories, Category) {
    'ngInject';
    console.log(categories);
    this._Merch = Merch;
    this._Brand = Brand;
    this._Category = Category;
    this._$state = $state;
    this._toastr = Toastr;
    this.currentUser = User.current;
    this.brand = {
      name: '',
      description: '',
      web: ''
    };
    this.category = {
      name: '',
      description: '',
    };
    this.item = {
      name: '',
      description: '',
      category: '',
      brand: '',
      sizes: [],
      colors: [],
      images: []
    };
    this.allBrands = brands['brands'];
    this.allCategories = categories['categories']

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

  submitCategory() {
    if (this.category.name != '' && this.category.name != undefined) {
      this._Category.createCategory(this.category).then(
        (success) => {
          this._toastr.showToastr("success", "Category created");
          console.log(success);
          setTimeout(() => { location.reload() }, 1000);
        }),
        (err) => {
          this._toastr.showToastr("error", "Error: Cannot create category");
          setTimeout(() => { location.reload() }, 1000);
        }
    } else {
      console.log("ERROR");
    }

  }

  deleteCategory(slug) {
    console.log(slug);
    this._Category.deleteCategory(slug).then((result) => {
      console.log(result);
    })
  }

  submitItem() {
    if (this.item.name != '' && this.item.name != undefined) {
      this.item.sizes = this.item.sizes.split(',');
      this.item.colors = this.item.colors.split(',');
      this.item.images = this.item.images.split(',');

      console.log(this.item);

      this._Merch.createItem(this.item).then(
        (success) => {
          this._toastr.showToastr("success", "Item created");
          console.log(success);
          setTimeout(() => { location.reload() }, 1000);
        }),
        (err) => {
          this._toastr.showToastr("error", "Error: Cannot create Item");
          setTimeout(() => { location.reload() }, 1000);
        }
    } else {
      console.log("ERROR");
    }

  }


}


export default EditorMerchCtrl;
