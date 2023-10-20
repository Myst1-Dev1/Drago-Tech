import { request, gql } from 'graphql-request';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getProducts = async () => {
    const query = gql`
        query Products {
            products(first:14) {
            description
            id
            name
            price
            slug
            type
            image {
                url
            }
            brand
            portion
            }
        }
    `

    const results:any = request(graphqlAPI, query);

    return results;
}