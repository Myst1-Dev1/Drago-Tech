export type Products = {
    node: {
        name:string;
        brand:string;
        description:string;
        id:string;
        portion:number;
        price:number;
        slug:string;
        type:string;
        image: {
            url:string;
        }
    }
}