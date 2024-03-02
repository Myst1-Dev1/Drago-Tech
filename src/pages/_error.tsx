import { Button } from "../components/Button";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';

export default function Page404() {
    return (
        <>
            <Head><title>Página não encontrada</title></Head>  
            <div className="container py-5 d-flex flex-column justify-content-center align-items-center gap-3">      
                <Image width={300} height={300} className="w-50 d-block" src="/images/404Img.webp" alt="imagem de 404" />
                <h5 className="fw-bold">Parece que vc se perdeu</h5>
                <Link href='/'><Button>Voltar para Início</Button></Link>
            </div>
        </>
    )
}