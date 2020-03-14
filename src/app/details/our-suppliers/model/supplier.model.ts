interface Supplier {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string;
            page_title: string;
            page_content: string;
        },
        suppliers: [
            {
                supplier_image: string;
                supplier_name: string;
                supplier_details: string;
            },
            {
                supplier_image: string;
                supplier_name: string;
                supplier_details: string;
            }
        ],
        page_bottom: {
            title: string;
            linktext: string;
        }
    }
}