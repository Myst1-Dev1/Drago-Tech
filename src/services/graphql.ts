import { request, gql } from 'graphql-request';
import { api } from '../services/axios';

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
  try {
    const response = await api.post('comments', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const submitFavorite = async(obj:any) => {
  try {
    const response = await api.post('favorites', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const submitOrder = async(obj:any) => {
  try {
    const response = await api.post('orders', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const updateUser = async(obj:any) => {
  try {
    const response = await api.put('updateUserData', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const updateUserPrime = async(obj:any) => {
  try {
    const response = await api.put('updateUserPrime', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const updateReceivedProduct = async(obj:any) => {
  try {
    const response = await api.put('receivedProduct', obj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const deleteFavorite = async(obj:any) => {
  try {
    const response = await api.delete('deleteFavorites', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: obj,
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}