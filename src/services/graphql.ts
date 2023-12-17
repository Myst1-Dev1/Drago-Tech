import axios from 'axios';
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
    const response = await axios.post('http://localhost:3000/api/comments', obj, {
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
    const response = await axios.post('http://localhost:3000/api/favorites', obj, {
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
    const response = await axios.post('http://localhost:3000/api/orders', obj, {
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
    const response = await axios.put('http://localhost:3000/api/updateUserData', obj, {
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
    const response = await axios.put('http://localhost:3000/api/updateUserPrime', obj, {
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
    const response = await axios.put('http://localhost:3000/api/receivedProduct', obj, {
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
    const response = await axios.delete('/api/deleteFavorites', {
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