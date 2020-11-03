export default class Brand {
    constructor(AppConstants, $http, $q, GraphQLClient) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClient;
    }

    getAll() {
        let query = `
        query getBrands{
            brands{
                id
                slug
                name
                description
                web
              }
          }
      `;
        return this._GQL.get(query);
    }

}