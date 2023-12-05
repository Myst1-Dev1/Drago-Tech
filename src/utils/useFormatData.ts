export function formatData(date:string | number | any) {
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year:'numeric' });
}