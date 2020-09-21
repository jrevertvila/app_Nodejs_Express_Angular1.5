import angular from 'angular';

console.log("tweet index.js");
// Create the module where our functionality can attach to
let tweetsModule = angular.module('app.tweets', []);

// Include our UI-Router config settings
import TweetsConfig from './tweets.config';
tweetsModule.config(TweetsConfig);

// Controllers
import TweetsCtrl from './tweets.controller';
tweetsModule.controller('TweetsCtrl', TweetsCtrl);

    //DETAILS CTRL
import TweetCtrl from './tweet.controller';
tweetsModule.controller('TweetCtrl', TweetCtrl);




// import TweetActions from './tweet-actions.component';
// tweetsModule.component('tweetActions', TweetActions);

// import Comment from './comment.component';
// tweetModule.component('comment', Comment);


export default tweetsModule;
