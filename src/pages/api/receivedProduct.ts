import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function receivedProduct(req: NextApiRequest, res:NextApiResponse) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${graphCMSToken}`,
        },
    });

    const query = gql`
    mutation receivedProduct($id:ID!, $isReceived:Boolean!) {
        updateOrder(where: {id: $id}, data: {isReceived: $isReceived}) {
          isReceived
        }
      }
    `;

    const result = await graphQLClient.request(query, {
        id:req.body.id,
        isReceived:req.body.isReceived
    });

    return res.status(200).send(result);
}