import Head from "next/head";

export default function SucessDelivery() {
    return (
        <>
            <Head>
                <title>Pedido Recebido com sucesso | Drago Tech</title>
            </Head>

            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h4 className="fw-bold">Prezado Cliente</h4>
                        <h5>
                            Agradecemos imensamente por nos informar que o seu pedido foi entregue com sucesso!
                            Estamos extremamente felizes em saber que conseguimos atender às suas expectativas
                            e proporcionar uma experiência de compra positiva.
                            A sua satisfação é a nossa prioridade, e cada confirmação de entrega é motivo de
                            celebração para toda a equipe da Drago Tech. Esperamos que os produtos escolhidos
                            atendam plenamente às suas necessidades e expectativas.
                        </h5>
                    </div>
                    <img className="img-fluid col-md-6" 
                        src="/images/successDelivery.png" 
                        alt="image de entrega feita com sucesso" 
                    />
                </div>
            </div>
        </>
    )
}