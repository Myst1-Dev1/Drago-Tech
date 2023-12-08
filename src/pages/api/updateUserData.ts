import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function updateUserData(req:NextApiRequest, res:NextApiResponse) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${graphCMSToken}`,
        },
      });

      const query = gql`
        mutation updateUserData($email:String!, $name: String!, $address: String!, $phone: String!
            $city: String!, $state: String!, $password: String!, $zipCode: String!) {
            updateUserDataId(where: { email: $email } 
            data: {name: $name, address: $address, phone: $phone, city: $city, state: $state, 
                    password: $password, zipCode: $zipCode}){
            name
            address
            phone
            city
            state
            password
            zipCode
            }
        }
      `;

      const result = await graphQLClient.request(query, {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        password: req.body.password,
        zipCode: req.body.zipCode,
        email: req.body.email
      });

      return res.status(200).send(result);
}