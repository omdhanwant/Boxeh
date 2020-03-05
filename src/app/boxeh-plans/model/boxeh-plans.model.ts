
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
                recipes: any[];
            }
        ]
    }
}