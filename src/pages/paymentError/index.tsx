import Head from "next/head";

export default function PaymentError() {
    return (
        <>
            <Head><title>Erro no pagamento</title></Head>
            <div className="py-5 container">
                <h5 className="text-center">Tivemos um erro ao processar o seu pagamento</h5>
            </div>
        </>
    )
}