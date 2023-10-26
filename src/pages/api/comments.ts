import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function asynchandler(req: NextApiRequest, res:NextApiResponse) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphCMSToken}`,
    },
  });

  const query = gql`
  mutation createComment($name: String!, $avaliation: String!, $comment: String!, $slug: String!) {
    createComments(data: {
      name: $name,
      avaliation: $avaliation,
      comment: $comment,
      products: { connect: { slug: $slug } }
    }) {
      id
    }
  }
    `

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    avaliation: req.body.avaliation,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}