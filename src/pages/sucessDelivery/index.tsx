import Head from "next/head";

export default function sucessDelivery() {
    return (
        <>
            <Head>
                <title>Pedido Recebido com sucesso | Drago Tech</title>
            </Head>

            <div className="container py-5">
                <h4>Nós da equipe da Drago Tech ficamos muito felizes em saber
                    que o pedido foi entregue corretamente. Obrigado pela compra
                    e assine o Prime caso não seja inscrito ainda
                </h4>
            </div>
        </>
    )
}