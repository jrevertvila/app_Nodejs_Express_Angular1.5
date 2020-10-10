export default class Releases {
    constructor(AppConstants, $http, $q) {
        'ngInject';
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
    }
    
    query(config) {
        let request = {
            url: this._AppConstants.api + '/releases',
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
    }

       
    getReleases() {
        
        // Create the $http object for this request
        //_AppConstants =  api: 'http://localhost:3000/api',
        return this._$http({
            url: this._AppConstants.api + '/releases/', 
            method: 'GET',
            // params: {limit : limit} //Indicar cuantas releases queremos obtener (enviar data por params)
        }).then(res => {
            return res.data.releases
        }
        );
    }


    //return one release
    
    get(slug) {
        let deferred = this._$q.defer();
    
        if (!slug.replace(" ", "")) {
            deferred.reject("Release slug is empty");
            return deferred.promise;
        }
    
        this._$http({
            url: this._AppConstants.api + '/releases/' + slug,
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data.release),
            (err) => deferred.reject(err)
        );
    
        return deferred.promise;
    }

    //DELETE RELEASE

    destroy(slug) {
        return this._$http({
            url: this._AppConstants.api + '/releases/' + slug,
            method: 'DELETE'
        })
    }

    save(release) {
        let request = {};
        
        if (release.slug) {
            request.url = `${this._AppConstants.api}/releases/${release.slug}`;
            request.method = 'PUT';
            delete release.slug;
    
        } else {
            request.url = `${this._AppConstants.api}/releases`;
            request.method = 'POST';
        }
    
        request.data = { release: release };
    
        return this._$http(request).then((res) => res.data.release);
    }
  
}