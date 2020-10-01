import angular from 'angular';

// Create the module where our functionality can attach to
let editorReleasesModule = angular.module('app.editorReleases', []);

// Include our UI-Router config settings
import EditorReleasesConfig from './editorReleases.config';
editorReleasesModule.config(EditorReleasesConfig);


// Controllers
import EditorReleasesCtrl from './editorReleases.controller';
editorReleasesModule.controller('EditorReleasesCtrl', EditorReleasesCtrl);


export default editorReleasesModule;
