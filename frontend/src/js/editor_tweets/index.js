import angular from 'angular';

// Create the module where our functionality can attach to
let editorTweetsModule = angular.module('app.editorTweets', []);

// Include our UI-Router config settings
import EditorTweetsConfig from './editorTweets.config';
editorTweetsModule.config(EditorTweetsConfig);


// Controllers
import EditorTweetsCtrl from './editorTweets.controller';
editorTweetsModule.controller('EditorTweetsCtrl', EditorTweetsCtrl);


export default editorTweetsModule;
