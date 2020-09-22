import angular from 'angular';

let releasesModule = angular.module('app.releases', []);

// Include our UI-Router config settings
import ReleasesConfig from './releases.config';
releasesModule.config(ReleasesConfig);


//------- IMPORT CONTROLLERS -------

// CONTROLLER LIST RELEASES
import ReleasesCtrl from './releases.controller';
releasesModule.controller('ReleasesCtrl', ReleasesCtrl);

// CONTROLLER DETAILS RELEASE
import ReleaseCtrl from './release.controller';
releasesModule.controller('ReleaseCtrl', ReleaseCtrl);


export default releasesModule;