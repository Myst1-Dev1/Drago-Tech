import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function sendEmail(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        const { to, subject, text } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
          };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ success: false, error: 'Erro ao enviar e-mail' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Método não permitido' });
    }
}