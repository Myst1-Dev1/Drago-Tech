import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const cookie:any = {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN
const jwtSecret:any = process.env.JWT_SECRET;

const client = new GraphQLClient(graphqlAPI, {
    headers: {
      Authorization: `Bearer ${graphCMSToken}`,
    },
});

const getUserByEmail = gql`
query getUserData($email: String!) {
    userDataId(where: {email: $email}, stage: DRAFT) {
      email
      password
      token
      state
      city
      zipCode
      name
      address
      phone
      id
      prime
      favorites {
        favoriteImage
        favoriteName
        favoritePrice
        id
      }
      orders {
        cep
        cidade
        createdAt
        email
        endereco
        estado
        id
        isReceived
        telefone
        orderProductName
        orderTotalPrice
      }
    }
  }
`;

const updateUserMutation = gql`
mutation updateUser($where:UserDataIdWhereUniqueInput!, $data: UserDataIdUpdateInput!){
    updateUserDataId(data:$data, where:$where) {
        token
        email
    }
}
`;

export default withIronSessionApiRoute(
  async function signIn(req:any, res:NextApiResponse) {
    if (req.method === 'OPTIONS') {
      // Respond to preflight request
      res.status(200).end();
      return;
  }
    // Adicione os cabeçalhos CORS aqui
    res.setHeader('Access-Control-Allow-Origin', 'https://drago-tech.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).end();
      return;
    }
    const getUserResponse = await client.request(getUserByEmail, { email });
    const { userDataId }:any = getUserResponse;
    if (!userDataId) {
      res.status(400).end();
      return;
    }
    const { password: hashedPassword } = userDataId;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      res.status(400).end();
      return;
    }
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: 36005 });
    const updateUserResponse = await client.request(updateUserMutation, { where: { email }, data: { token } });
    const { updateUserDataId }:any = updateUserResponse;
    if (!updateUserDataId?.token) {
      res.status(500).end();
      return;
    }
    req.session.user = {
      token: updateUserDataId.token
    };
    await req.session.save();
    res.status(200).json({ token: updateUserDataId.token });
  },
  cookie
);