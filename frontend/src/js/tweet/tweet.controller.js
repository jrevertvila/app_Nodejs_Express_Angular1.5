import marked from 'marked';
console.log("controller tweet")
class TweetCtrl {
  constructor(tweet, User, $sce, $rootScope) {
    'ngInject';

    this.tweet = tweet;

    this.currentUser = User.current;

    $rootScope.setPageTitle("@"+this.tweet.author.username);

    this.tweet.body = $sce.trustAsHtml(marked(this.tweet.body, { sanitize: true }));
    console.log(this.tweet);
    // Comments.getAll(this.tweet.slug).then(
    //   (comments) => this.comments = comments
    // );

    // this.resetCommentForm();
  }
  

  // resetCommentForm() {
  //   this.commentForm = {
  //     isSubmitting: false,
  //     body: '',
  //     errors: []
  //   }
  // }

  // addComment(){
  //   this.commentForm.isSubmitting = true;

  //   this._Comments.add(this.article.slug, this.commentForm.body).then(
  //     (comment) => {
  //       this.comments.unshift(comment);
  //       this.resetCommentForm();
  //     },
  //     (err) => {
  //       this.commentForm.isSubmitting = false;
  //       this.commentForm.errors = err.data.errors;
  //     }
  //   )
  // }

  // deleteComment(commentId, index) {
  //   this._Comments.destroy(commentId, this.article.slug).then(
  //     (success) => {
  //       this.comments.splice(index, 1);
  //     }
  //   )
  // }

}


export default TweetCtrl;
