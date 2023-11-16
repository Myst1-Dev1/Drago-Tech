import { GraphQLClient, gql } from 'graphql-request';
import jwt from 'jsonwebtoken';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN
const jwtSecret:any = process.env.JWT_SECRET;

const client = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${graphCMSToken}`,
    },
});

const getUserByEmailQuery = gql`
query getUserData($email: String!) {
    userDataId(where: {email: $email}, stage: DRAFT) {
      address
      city
      email
      id
      name
      phone
      state
      token
      zipCode
      prime
    }
  }
`;

export default async function GetAuthenticatedUser(req:any, res:any) {
    const defaultReturnObject = { authenticated: false, user: null };

    try {
        const token = String(req?.headers?.authorization?.replace('Bearer ', ''));
        const decoded:any = jwt.verify(token, jwtSecret);
        const getUserResponse = await client.request(getUserByEmailQuery, { email: decoded.email });
        const { userDataId }:any = getUserResponse;
        if(!userDataId) {
            res.status(400).json(defaultReturnObject);
            return;
        };
        res.status(200).json({ authenticated: true, user: userDataId });
    } catch (error) {
        console.log('GetAuthenticatedUser, Something Went Wrong', error);
        res.status(400).json(defaultReturnObject);
    };
};