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

    createBrand(input) {
        let query = `
        mutation createBrand($input: BrandInput){
            createBrand(input: $input){
                id
                slug
                name
                description
                web
            }
        }
      `;
      let variables = {

        "input": input
      }
      return this._GQL.post(query,variables);
    }

}