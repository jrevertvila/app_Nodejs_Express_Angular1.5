class EditorTweetsComponentCtrl {
  constructor($state, User, Tweets, Toastr) {
    'ngInject';
    this._toastr = Toastr;
    this._Tweets = Tweets;
    this._$state = $state;
    this.currentUser = User.current;

    this.$onInit = function () {
      // console.log("aaaa");
      // console.log(this.parent);
    };
  }

  submit() {
    this.parent == undefined ? this.tweet.parent = null : this.tweet.parent = this.parent;
    this.isSubmitting = true;
    this._Tweets.save(this.tweet).then(
      (success) => {
        this._toastr.showToastr("success", "Tweet publicado");
        setTimeout(() => {
          location.reload();
        }, 1000);
      },
      (err) => {
        this.isSubmitting = false;
        this._toastr.showToastr("error", "No se ha podido publicar el tweet");
        this.errors = err.data.errors;
        setTimeout(() => {
          this._$state.go('app.home');
        }, 1500);
        
      }
    )
  }
}


let EditorTweets = {
  bindings: {
    parent: '='
  },

  controller: EditorTweetsComponentCtrl,
  templateUrl: 'components/tweets-helpers/editorTweets.html'
};

export default EditorTweets;