export function formatPrice(price:number) {
    return Intl.NumberFormat('pt-br', {
        style:'currency',
        currency:'BRL'
    }).format(price);
}