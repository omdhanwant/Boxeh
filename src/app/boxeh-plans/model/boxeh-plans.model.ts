
interface BoxehPlans {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string;
            content: string;
        },
        products: [
            {
                id: number;
                name: string;
                description: string;
                recipes:{
                    content: string;
                    cooking_time: string;
                    extra_info:string;
                    id: number
                    thumbnail_url: string;
                    title: string;
                }[];
                thumbnail:string;
            }
        ]
    }
}