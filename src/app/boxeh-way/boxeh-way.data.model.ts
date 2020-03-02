interface BoxehWhy {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: [
            {
                bg_cover: string;
                title: string;
                sub_title: string;
            }
        ],
        section_how_it_works: [
            {
                background: string;
                title: string;
                sub_title: string;
                toggle_button_text: string;
                toggle_repeater: [
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    }
                ]
            },
            {
                background: string;
                title: string;
                sub_title: string;
                toggle_button_text: string;
                toggle_repeater: [
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    }
                ]
            },
            {
                background: string;
                title: string;
                sub_title: string;
                toggle_button_text: string;
                toggle_repeater: [
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    },
                    {
                        icon: string;
                        title: string;
                        subtitle: string;
                    }
                ]
            }
        ],
        section_subscribe: {
            section_background: string;
            title: string;
            sub_title: string;
            button_url: string;
            button_text: string;
        }
    }
}