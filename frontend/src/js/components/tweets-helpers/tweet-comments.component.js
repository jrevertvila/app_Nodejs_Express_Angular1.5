class TweetCommentsCtrl {
  constructor(User) {
    'ngInject';
    this.$onInit = function () {
      console.log(this.replies);
      console.log(this.parent);
      console.log("ssssssssssssssssss");
    };
    // console.log(this.replies);

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
    parent: '=',
    replies: '=',
  },
  controller: TweetCommentsCtrl,
  templateUrl: 'components/tweets-helpers/tweet-comments.html'
};

export default TweetComments;
