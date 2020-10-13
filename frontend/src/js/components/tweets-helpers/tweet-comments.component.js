class TweetCommentsCtrl {
    constructor(User) {
      'ngInject';
  
      // if (User.current) {
      //   this.canModify = (User.current.username === this.data.author.username);
      // } else {
      //   this.canModify = false;
      // }
  
    }
  }
  
  let TweetComments = {
    bindings: {
    //   data: '=',
    //   deleteComment: '&'
    },
    controller: TweetCommentsCtrl,
    templateUrl: 'components/tweets-helpers/tweet-comments.html'
  };
  
  export default TweetComments;
  