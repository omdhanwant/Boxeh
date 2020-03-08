interface OurCollaborators {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string,
            page_title: string,
            page_content: string
        },
        section_our_inspiration: {
            our_inspiration_rows: [
                {
                    Title: string,
                    image: string,
                    content: string,
                }
            ],
            our_inspiration_content: string,
        },
        section_our_collaborators: {
            title: string,
            sub_title: string,
            partners: [
                {
                    name: string,
                    image: string,
                    description: string,
                },
                {
                    name: string,
                    image: string,
                    description: string,
                },
                {
                    name: string,
                    image: string,
                    description: string,
                }
            ]
        }
    }
}