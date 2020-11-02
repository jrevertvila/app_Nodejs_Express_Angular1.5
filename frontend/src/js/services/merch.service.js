export default class Merch {
    constructor(AppConstants, $http, $q, GraphQLClient) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClient;
    }

    getAll() {
        let query = `
        query getMerch{
            sweatshirts{
                id
                slug
                name
                brand {
                  id
                  slug
                  name
                }
                images
              }
              shoeses{
                id
                slug
                name
                brand {
                  id
                  slug
                  name
                }
                images
              }
          }
      `;
        return this._GQL.get(query);
    }

}