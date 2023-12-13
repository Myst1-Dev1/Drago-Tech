import { Button } from "../../components/Button";
import Link from "next/link";

export default function Page401() {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center gap-3 py-5">
            <img className="w-50 d-block d-sm-none" src="/images/401Img.png" alt="imagem de 404" />
            <img className="w-25 d-none d-sm-block" src="/images/401Img.png" alt="imagem de 404" />
            <h5 className="fw-bold">Você não tem permissão ou precisa estar logado</h5>
            <Link href="/signInPage"><Button>Ir para Login</Button></Link>
        </div>
    )
}