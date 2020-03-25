export interface Product 
{
    code: number;
    status: boolean;
    message: string;
    data: {
        id: number;
        name: string;
        description: string;
        sku: string;
        categories: 
            {
                id: number;
                name: string;
                slug: string;
            }[]
        ,
        images: any[],
        attributes:
            {
                id: number;
                name: string;
                position: number;
                visible: boolean;
                variation: boolean;
                options: number[];
            }[]
        ,
        variations: 
            {
                id: number;
                sku: string;
                regular_price: number;
                sale_price: string;
                stock_status: string;
                image: string;
                attributes: 
                    {
                        id: number;
                        name: string;
                        option: string;
                    }[]
                
            }[]
        ,
        recipes: 
            {
                id: number;
                title: string;
                content: string;
                thumbnail_url: string;
                cooking_time: string;
                extra_info: string;
            }[]
        
    }
}