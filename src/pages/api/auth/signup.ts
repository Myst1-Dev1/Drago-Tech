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
  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
}

    // Adicione os cabeçalhos CORS aqui
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { email, password, name, address, city, state, phone, zipCode } = req.body;
    if(!email || !password || !name || !address || !city || !state || !phone || !zipCode) {
        res.status(400).end();
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
