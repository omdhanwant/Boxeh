interface OurStory {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string,
            marketing_message_title: string;
            marketing_message_subtitle: string;
            page_title: string;
            page_content: string;
        },
        section1: [
            {
                background: string,
                title: string,
                content: string;
            }
        ],
        section2: {
            title: string;
            textwithimage: [
                {
                    titleimage: string;
                    contentimage: string;
                    image_value: string;
                }];
        },
        subscribe_section: {
            subscription_background: string;
            subscription_main_text: string;
            subscription_sub_text: string;
            subscription_button_text: string;
        }
    }
}