// class EditorTweetsComponentCtrl {
//     constructor($scope, $state, User, Tweets, tweet = null){
//         "ngInject";
//         this._Tweets = Tweets;
//         this._$state = $state;
//         this._$scope = $scope;
        
//         this.currentUser = User.current;
//         console.log(this.currentUser);
//         this.tweet = tweet;

//         this.tweet = {
//           body: 'hola'
//         }

//         console.log("bonica");
        
        
//     }

//     submit() {
//         console.log(this.tweet.body);

//       }

// }

class EditorTweetsComponentCtrl {
    constructor($scope, $state, User, Tweets) {
      'ngInject';
  
      this._Tweets = Tweets;
      this._$state = $state;
      this._$scope = $scope;
      // console.log(User.current)
      this.currentUser = User.current;
      console.log(this.currentUser);
    //   console.log(tweet);

      // $scope.$watch('User.current', (newUser) => {
      //   this.currentUser = newUser;
      // })
  
    this._$scope.tweet = "";
    //   if (!tweet) {
    //     this.tweet = {
    //       body: ''
    //     }
    //   } else {
    //     this.tweet = tweet;
    //   }
  
    }
  
    submit() {
      // this.isSubmitting = true;
      console.log(this.tweet);
      // this._Tweets.save(this.tweet).then(
      //   (newTweet) => {
      //     this._$state.go('app.tweets', { slug: newTweet.slug });
      //   },
  
      //   (err) => {
      //     this.isSubmitting = false;
      //     this.errors = err.data.errors;
      //   }
  
      // )
    }
  
  
  
  }


let EditorTweets = {
    
    controller: EditorTweetsComponentCtrl,
    templateUrl: 'components/tweets-helpers/editorTweets.html'
};

export default EditorTweets;