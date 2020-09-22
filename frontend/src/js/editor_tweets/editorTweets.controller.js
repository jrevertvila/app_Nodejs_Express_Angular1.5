class EditorTweetsCtrl {
    constructor(Tweets, tweet, $state) {
      'ngInject';
  
      this._Tweets = Tweets;
      this._$state = $state;
  
      if (!tweet) {
        this.tweet = {
          body: ''
        }
      } else {
        this.tweet = tweet;
      }
  
    }
  
    submit() {
      this.isSubmitting = true;
  
      this._Tweets.save(this.tweet).then(
        (newTweet) => {
          this._$state.go('app.tweets', { slug: newTweet.slug });
        },
  
        (err) => {
          this.isSubmitting = false;
          this.errors = err.data.errors;
        }
  
      )
    }
  
  
  
  }
  
  
  export default EditorTweetsCtrl;
  