import angular from 'angular';

console.log("tweet index.js");
// Create the module where our functionality can attach to
let tweetModule = angular.module('app.tweet', []);

// Include our UI-Router config settings
import TweetConfig from './tweet.config';
tweetModule.config(TweetConfig);


// Controllers
import TweetCtrl from './tweet.controller';
tweetModule.controller('TweetCtrl', TweetCtrl);

import TweetActions from './tweet-actions.component';
tweetModule.component('tweetActions', TweetActions);

// import Comment from './comment.component';
// tweetModule.component('comment', Comment);


export default tweetModule;
