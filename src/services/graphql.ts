import { request, gql } from 'graphql-request';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getProducts = async () => {
    const query = gql`
    query Products {
        productsConnection(first:14) {
          edges {
            node {
              brand
              description
              id
              image {
                url
              }
              name
              portion
              price
              slug
              type
            }
          }
        }
      }
    `

    const results:any = await request(graphqlAPI, query);

    return results.productsConnection.edges;
}

export const getNewProducts = async () => {
  const query = gql`
    query NewProducts {
      productsConnection(
        first: 6,
        orderBy: createdAt_DESC
      ) {
        edges {
          node {
            brand
            description
            id
            image {
              url
            }
            name
            portion
            price
            slug
            type
          }
        }
      }
    }
  `

    const results:any = await request(graphqlAPI, query);
    
    return results.productsConnection.edges;
}

export const getProductsDetails = async (slug:any) => {
    console.log('Slug:', slug);
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