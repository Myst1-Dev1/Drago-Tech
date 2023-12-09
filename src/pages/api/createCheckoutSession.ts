import { NextApiRequest, NextApiResponse } from "next";
import Stripe from 'stripe';

const stripe = new Stripe(
    `${process.env.STRIPE_SECRET_KEY}`,
    {
      apiVersion: '2023-10-16',
    }
)
export default async function createCheckoutSession(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        const { email } = req.body;

        try {
            const session = await stripe.checkout.sessions.create({
                mode:'subscription',
                payment_method_types: ['card'],
                customer_email:email,
                line_items: [
                    {price:'price_1OKwobLCrKXJv6M5Lmtimey3', quantity:1}
                ],
                success_url:'http://localhost:3000/primeSucessPayment',
                cancel_url:'http://localhost:3000/paymentError'
            });

            res.status(200).json({ sessionId: session.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar a sessão de checkout' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
      }
}