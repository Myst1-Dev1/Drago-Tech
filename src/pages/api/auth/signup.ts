import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN
const jwtSecret:any = process.env.JWT_SECRET;
const { JWT_EXPIRES_IN } = process.env;

const client = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${graphCMSToken}`,
    },
});

const createUser = gql`
mutation createUser($userData: UserDataIdCreateInput!) {
    createUserDataId(
      data: $userData
    ) {
      address
      city
      email
      name
      password
      phone
      zipCode
      token
      state
      id
      prime
    }
  }
`;

export default async function handler(req: NextApiRequest, res:NextApiResponse) {

    const { email, password, name, address, city, state, phone, zipCode } = req.body;
    if(!email || !password || !name || !address || !city || !state || !phone || !zipCode) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const token = jwt.sign({ email }, jwtSecret, { expiresIn: JWT_EXPIRES_IN });
    const hashedPassword = await bcrypt.hash(password, 8);
    const userData = {
        email,
        password: hashedPassword,
        name,
        address,
        city,
        state,
        phone,
        zipCode,
        token,
        prime:false
    };

    const response:any = await client.request(createUser, { userData });
    if(!response?.createUserDataId?.id) {
        res.status(500);
    }
    res.status(200).json({ token });
}
