import { GraphQLClient, gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

const graphqlAPI:any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphCMSToken = process.env.GRAPHCMS_TOKEN

export default async function createOrders(req: NextApiRequest, res:NextApiResponse) {
    const graphQLClient = new GraphQLClient((graphqlAPI), {
        headers: {
          authorization: `Bearer ${graphCMSToken}`,
        },
    });

    const query = gql`
        mutation createOrder($email:String!, $telefone:String!, $endereco:String!, $cidade:String!, 
            $estado:String!, $cep:String!, $orderTotalPrice:Float!, $orderProductName:[String!]! $userEmail:String!) {
                createOrder(
                    data: {
                        email: $email, 
                        telefone: $telefone, 
                        endereco: $endereco, 
                        cidade: $cidade, 
                        estado: $estado, 
                        cep: $cep,
                        orderProductName:$orderProductName
                        orderTotalPrice: $orderTotalPrice
                        usersData: {connect: {email: $userEmail}}}
                  ) {
                    cep
                    cidade
                    createdAt
                    email
                    endereco
                    estado
                    id
                    telefone
                    orderTotalPrice
                    orderProductName
                  }
        }
    `;

    const result = await graphQLClient.request(query, {
        email:req.body.email,
        telefone:req.body.telefone,
        endereco:req.body.endereco,
        cidade:req.body.cidade,
        estado: req.body.estado,
        cep:req.body.cep,
        orderTotalPrice:req.body.orderTotalPrice,
        orderProductName:req.body.orderProductName,
        userEmail:req.body.userEmail
    });

    return res.status(200).send(result);
}