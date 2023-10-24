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

    const results:any = await request(graphqlAPI, query);

    return results.products;
}

export const getProductsDetails = async (slug:any) => {
    console.log('Slug:', slug); // Verifique o valor do slug
    const query = gql`
        query getProductsDetails($slug: String!) {
            products(where: { slug: $slug }) {
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

    const results:any = await request(graphqlAPI, query, {slug});

    return results.products;
}