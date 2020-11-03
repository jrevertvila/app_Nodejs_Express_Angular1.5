import angular from 'angular';

// Create the module where our functionality can attach to
let editorMerchModule = angular.module('app.editorMerch', []);

// Include our UI-Router config settings
import EditorMerchConfig from './editorMerch.config';
editorMerchModule.config(EditorMerchConfig);


// Controllers
import EditorMerchCtrl from './editorMerch.controller';
editorMerchModule.controller('EditorMerchCtrl', EditorMerchCtrl);


export default editorMerchModule;

