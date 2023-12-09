import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

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

      const { name, address, phone, city, state, password, zipCode, email } = req.body;
      const hashedPassword = await bcrypt.hash(password, 8);

      const result = await graphQLClient.request(query, {
        name,
        address,
        phone,
        city,
        state,
        password: hashedPassword,
        zipCode,
        email
      });

      return res.status(200).send(result);
}