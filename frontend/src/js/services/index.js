import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

import GraphQLClientService from './graphql.service';
servicesModule.service('GraphQLClient', GraphQLClientService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import TweetsService from './tweets.service';
servicesModule.service('Tweets', TweetsService);

import ReleasesService from './releases.service';
servicesModule.service('Releases', ReleasesService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import ToastrService from './toastr.service';
servicesModule.service('Toastr', ToastrService);

import MerchService from './merch.service';
servicesModule.service('Merch', MerchService);

import BrandService from './brand.service';
servicesModule.service('Brand', BrandService);



export default servicesModule;
