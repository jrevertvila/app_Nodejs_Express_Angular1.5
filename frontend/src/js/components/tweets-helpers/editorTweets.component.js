class EditorTweetsComponentCtrl {
    constructor($state, User, Tweets) {
      'ngInject';
  
      this._Tweets = Tweets;
      this._$state = $state;
      this.currentUser = User.current;
    }
  
    submit() {
      this.isSubmitting = true;
      console.log(this.tweet);
      this._Tweets.save(this.tweet).then(
        (success) => location.reload(),
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
          this._$state.go('app.home');
        }
  
      )
    }
  
  
  
  }


let EditorTweets = {
    
    controller: EditorTweetsComponentCtrl,
    templateUrl: 'components/tweets-helpers/editorTweets.html'
};

export default EditorTweets;