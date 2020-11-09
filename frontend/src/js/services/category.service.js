export default class Category {
    constructor(AppConstants, $http, $q, GraphQLClient) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;
        this._GQL = GraphQLClient;
    }

    getAll() {
        let query = `
        query getCategories{
            categories{
                id
                slug
                name
                description
              }
          }
      `;
        return this._GQL.get(query);
    }

    createCategory(input) {
        let query = `
        mutation createCategory($input: CategoryInput){
            createCategory(input: $input){
                id
                slug
                name
                description
            }
        }
      `;
        let variables = {
            "input": input
        }
        return this._GQL.post(query, variables);
    }

    deleteCategory(slug) {
        let query = `
        mutation deleteCategory($input:deleteCategoryInput){
            deleteCategory(input:$input){
              ok
            }
          }
          `
          console.log(query);
        let variables = {
            "input": {
                "slug":slug
            }
        }
        console.log(variables);
        return this._GQL.post(query, variables);
    }

}