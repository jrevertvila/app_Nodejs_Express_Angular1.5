export default class Tweets {
    constructor(AppConstants, $http, $q) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }

    //return all tweets (limit 20 offset 0)
    
    query(config) {
        // Create the $http object for this request
        //_AppConstants =  api: 'http://localhost:3000/api',
        let request = {
            // url: this._AppConstants.api + '/tweets' + ((config.type === 'feed') ? '/feed' : ''),
            url: this._AppConstants.api + '/tweets',
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
    }


    //return one tweet
    
    get(slug) {
        let deferred = this._$q.defer();
    
        if (!slug.replace(" ", "")) {
            deferred.reject("Tweet slug is empty");
            return deferred.promise;
        }
    
        this._$http({
            url: this._AppConstants.api + '/tweets/' + slug, //slug = id of tweet
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data.tweet),
            (err) => deferred.reject(err)
        );
    
        return deferred.promise;
    }

    //DELETE TWEET

    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/tweets/' + slug,
            method: 'DELETE'
        })
    }

    save(tweet) {
        let request = {};
        
        //if uri have slug, mongo will update the tweet, else, will add one
        if (tweet.slug) {
            request.url = `${this._AppConstants.api}/tweets/${tweet.slug}`;
            request.method = 'PUT';
            delete tweet.slug;
    
        } else {
            request.url = `${this._AppConstants.api}/tweets`;
            request.method = 'POST';
        }
    
        request.data = { tweet: tweet };
    
        return this._$http(request).then((res) => res.data.tweet); //then, return data of new tweet
    }

    favorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/tweets/' + slug + '/favorite',
            method: 'POST'
        })
    }
    
    unfavorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/tweets/' + slug + '/favorite',
            method: 'DELETE'
        })
    }

    retweet(slug) {
        return this._$http({
            url: this._AppConstants.api + '/tweets/' + slug + '/retweet',
            method: 'POST'
        })
    }
    
    unretweet(slug) {
        return this._$http({
            url: this._AppConstants.api + '/tweets/' + slug + '/retweet',
            method: 'DELETE'
        })
    }
  
}
  