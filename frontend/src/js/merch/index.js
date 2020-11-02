import angular from 'angular';

let merchModule = angular.module('app.merch', []);

// Include our UI-Router config settings
import MerchConfig from './merch.config';
merchModule.config(MerchConfig);


//------- IMPORT CONTROLLERS -------

// CONTROLLER LIST RELEASES
import MerchCtrl from './merch.controller';
merchModule.controller('MerchCtrl', MerchCtrl);



export default merchModule;