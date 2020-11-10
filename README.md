# app_NodeJs_Express_Angular1.5

This application simulates the operation of Twitter. You can like the tweet. Follow other users. See the new releases of the website, even see added merchandising.

## Preview 📷
All the images shown below are provisional and will not be the final aspect of the web application:
### Homepage
![Preview home](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/home.png)
### Merchandising
![Preview merch](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/merch_list.png)
### Merchandising - Details
![Preview merch details](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/details_merch.png)
### Tweet
![Preview tweet](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/details_tweet.png)
### Releases
![Preview releases](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/releases_list.png)
### Releases - Details
![Preview releases details](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/details_releases.png)
### Login/Register
![Preview login](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/login1.png)
### Profile
![Preview profile](https://github.com/Jooui/app_Nodejs_Express_Angular1.5/blob/master/github_media/profile.png)


## Getting Started
For run the code on your local machine and be able to observe the latest changes you need to install the LAMP stack. You also need to import a database.
## Prerequisites

You must have **npm**, **nodejs**, **mongo** and **gulp** installed on your machine
```
sudo apt install nodejs
```
```
sudo apt install npm
```
```
sudo apt install gulp
```

For install MongoDB correctly, realize the following steps:

[How to install mongo (DigitalOcean)](https://www.digitalocean.com/community/tutorials/como-instalar-mongodb-en-ubuntu-18-04-es)

## Installation
Once you have everything installed, clone this repository and perform the "npm install" command on each backend and frontend.
```
npm install
```

Then, execute the following command in both backends:
```
npm run dev
```

And on the frontend:
```
gulp
```

## Built with 🛠️

### Frontend
* [AngularJS](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [JQuery](https://jquery.com/)
### Backend
* [PHP](https://www.php.net/)
* Framework PHP:  The backend simulates a real backend framework
### Database
* [MySQL](https://www.mysql.com/)

## Features
The application is divided into two important modules, the administrator panel and the client view.

### Admin:
* This is the administration panel. The movies module is the only one available right now. You can add new movies to the database. This module is a CRUD with the view controller model to easily view, edit or delete movies.

* As the application is under development, dummies can be created to fill our database quickly.

* In addition you can create new genres that will appear dynamically both in client view and to add a new movie.

### Client:
* All client view modules are developed with the controller view model.

| Module | Description |
| --- | --- |
| Home | Main page of the application where you can go directly to the store or consult the most viewed and valued genres and movies |
| Shop | Show all available movies with a filtering system by genre and sort by different fields. |
| Search | This module acts as a component throughout the application and can be easily implemented, e.g. in the home and the store. Automatically redirects to the store through the fields searched. |
| Contact | Contact form with Google Maps API integration and Mailgun |
| Cart | Show the products you want to buy |
| Login | Login module with local users and social login with Google and GHub using Firebase |
| Profile | In this module you can see your purchases, change your profile information and your favorite movies |


## APIs
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial?hl=es)
* [Firebase](https://firebase.google.com/)
* [OMDb](http://www.omdbapi.com/)


## Other Technologies
* [DataTables](https://datatables.net/)
* [JQWidgets](https://www.jqwidgets.com/)
* [OWLCarousel](https://owlcarousel2.github.io/OwlCarousel2/)
* [FontAwesome](https://fontawesome.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Multiple-Select](http://multiple-select.wenzhixin.net.cn/)
* [Dropzone](https://www.dropzonejs.com/)
* [Toastr](https://codeseven.github.io/toastr/)
