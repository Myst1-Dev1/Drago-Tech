import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import Image from 'next/image';
import styles from './styles.module.scss';
import Head from 'next/head';

export default function About() {

    const teamBoxMembers = [
        {
            id:1,
            img: "/images/seoImg.webp",
            name:"John Doe",
            position:"SEO"
        },
        {
            id:2,
            img: "/images/managerImg.webp",
            name:"Clark Willians",
            position:"Gerente"
        },
        {
            id:3,
            img: "/images/socialMediaImg.webp",
            name:"Serena Xavier",
            position:"Social Media"
        },
    ]

    return (
        <>
            <Head>
                <title>Sobre | Drago Tech</title>
            </Head>
            <div className={`container py-5 ${styles.about}`}>
                <h2 className='fw-bold text-center'>Quem somos?</h2>
                <div className={`row py-5`}>
                    <div className='col-md-6'>
                            <p>
                                Olá e bem-vindo à Drago Tech, sua loja de eletrônicos online definitiva! Na Drago Tech, 
                                estamos comprometidos em proporcionar uma experiência de compra única e inovadora para 
                                entusiastas de tecnologia e amantes de gadgets.
                            </p>
                            <p>
                                Nossa jornada começou com a paixão por conectar pessoas com a mais recente e emocionante 
                                tecnologia disponível. Na Drago Tech, acreditamos que a tecnologia não é apenas sobre 
                                dispositivos, mas sim sobre a experiência que ela traz para a vida cotidiana. Queremos ser 
                                sua fonte confiável para descobrir e adquirir os eletrônicos mais avançados e empolgantes do 
                                mercado.
                            </p>
                    </div>
                        <Image width={500} height={300} className='col-md-6' src="/images/aboutImg.webp" 
                            alt="imagem ficticia do escritorio da empresa  gerada por IA" 
                        />
                 
                </div>

                <div className={`py-5 ${styles.teamContainer}`}>
                    <h2 className='fw-bold text-center'>Nossa Equipe</h2>

                    <div className='row'>
                        {teamBoxMembers.map(member => (
                            <div key={member.id} className={`col-md-4 py-5 m-auto d-flex flex-column justify-content-center align-items-center ${styles.teamBox}`}>
                                <div className={styles.imgContainer}>
                                    <Image
                                        width={250}
                                        height={250}
                                        src={member.img} 
                                        alt="imagem ficticia de funcionários da empresa gerados por IA" 
                                    />
                                    <div className={`${styles.memberSocials}`}>
                                        <div className={`d-flex gap-3 ${styles.iconBox}`}>
                                            <FaFacebook className={styles.icon} />
                                            <FaInstagram className={styles.icon} />
                                            <FaTwitter className={styles.icon} />
                                        </div>
                                    </div>
                                </div>
                                <h6 className='fw-bold mt-3'>{member.name}</h6>
                                <h6 className='fw-bold'>{member.position}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}