interface Home {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string;
            title: string;
            sub_title: string;
            button_text: string;
        },
        section_how_it_works: {
            title: string;
            features: [
                {
                    feature_image: string;
                    feature_title: string;
                    feature_subtitle: boolean
                }
            ],
            button_text: string;
        },
        section_choose_plan: {
            section_background: string;
            title: string;
            advantages: string[];
            button_text: string;
        },
        section_week_recipes: {
            section_background: string;
            sub_title: string;
            weeks_to_show: [
                {
                    id: number;
                    name: string;
                }
            ],
            single_recipe_content: [
                {
                    tab_pane: number,
                    tablist: [
                        [
                            {
                                id: number,
                                post_name: string;
                                term_id: number;
                                title: string;
                            }
                        ]
                    ],
                    tab_content: [
                        {
                            post_slug: string;
                            id: number;
                            term_id: number;
                            recipes: [
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: number,
                                    title: string;
                                    content: string;
                                    recipe_cooking_time:  string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            section_footer: {
                title: string;
                wr_btn_url: string;
                wr_btn_text: string;
            }
        },
        section_subscribe: {
            section_background: string;
            title: string;
            sub_title: string;
            button_url: string;
            button_text: string;
        }
    }
}