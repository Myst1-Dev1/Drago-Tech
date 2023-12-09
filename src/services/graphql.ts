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
            commentsID {
              comment
              createdAt
              avaliation
              name
              id
            }
            }
        }
    `

    const results:any = await request(graphqlAPI, query, {slug});

    return results.products;
}

export const submitComment = async(obj:any) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}

export const submitFavorite = async(obj:any) => {
  const result = await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}

export const submitOrder = async(obj:any) => {
  const result = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const updateUser = async(obj:any) => {
  const result = await fetch('/api/updateUserData', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const updateUserPrime = async(obj:any) => {
  const result = await fetch('/api/updateUserPrime', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const deleteFavorite = async(obj:any) => {
  const result = await fetch('/api/deleteFavorites', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json();
}