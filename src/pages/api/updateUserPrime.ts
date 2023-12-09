import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function updateUserPrime(req:NextApiRequest, res:NextApiResponse) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${graphCMSToken}`,
        },
      });

    const query = gql`
    mutation updateUserPrime($email:String!, $prime:Boolean!) {
        updateUserDataId(where: {email: $email}, data: {prime: $prime}) {
          prime
        }
      }
    `

    const result = await graphQLClient.request(query, {
        email:req.body.email,
        prime:req.body.prime
    });

    return res.status(200).send(result);
}