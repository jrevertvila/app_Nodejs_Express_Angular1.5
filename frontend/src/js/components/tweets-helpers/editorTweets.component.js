class EditorTweetsComponentCtrl {
    constructor($scope, $state, User, Tweets){
        "ngInject";
        this._Tweets = Tweets;
        this._$state = $state;
        this._$scope = $scope;
        // console.log(User.current)
        this.currentUser = User.current;
        console.log(this.currentUser);


            this.tweet = {
              body: ''
            }
          
        
        // this._Tweets = Tweets;
        // console.log(this.tweet);
        
    }

    submit() {
        // this.isSubmitting = true;
        console.log(this.tweet);
        // this._Tweets.save(this.tweet).then(
        //   (newTweet) => {
        //     this._$state.go('app.home');
        //   },
    
        //   (err) => {
        //     this.isSubmitting = false;
        //     this.errors = err.data.errors;
        //   }
    
        // )
      }

}

let EditorTweets = {
    bindings: {
        tweet: '='
    },
    controller: EditorTweetsComponentCtrl,
    templateUrl: 'components/tweets-helpers/editorTweets.html'
};

export default EditorTweets;