import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handleCreateFavorite(req:NextApiRequest, res:NextApiResponse) {
  const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
  const graphCMSToken = process.env.GRAPHCMS_TOKEN

  const graphQLClient = new GraphQLClient((graphqlAPI), {
      headers: {
        authorization: `Bearer ${graphCMSToken}`,
      },
    });

  const query = gql`
    mutation createFavorites($favoriteName: String!, $favoritePrice: Float!, $favoriteImage: String!, $email: String!) {
      createFavorite(
          data: {
              favoriteName: $favoriteName, 
              favoritePrice: $favoritePrice, 
              favoriteImage: $favoriteImage, 
              usersData: {connect: {email: $email}}}
        ) {
          favoritePrice
          favoriteName
          favoriteImage
          id
        }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      favoriteName: req.body.favoriteName,
      favoritePrice: req.body.favoritePrice,
      favoriteImage: req.body.favoriteImage,
      email: req.body.email,
    });

    return res.status(200).send(result);
  } catch (error) {
    console.error('Error creating favorite:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}