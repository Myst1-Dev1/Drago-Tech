import { Button } from "@/components/Button";
import Head from "next/head";
import Link from "next/link";

export default function PrimeSucessPayment() {
    return (
        <>
            <Head><title>Pagamento feito com Sucesso | Drago Tech</title></Head>
            <div className="container d-flex flex-column gap-3 justify-content-center align-items-center py-5">
                <h5>Parabéns agora você pode desfrutar dos beneficios do prime</h5>
                <Link href="/shop"><Button>Ir para a loja</Button></Link>
            </div>
        </>
    )
}