import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function deleteFavorites(req:NextApiRequest, res:NextApiResponse) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${graphCMSToken}`,
        },
      });

    const query = gql`
    mutation deleteFavorite($id:ID!) {
      deleteFavorite(where: {id: $id}) {
        id
      }
    }
    `;

    const result = await graphQLClient.request(query, {
        id:req.body.id
    });

    return res.status(200).send(result);
}