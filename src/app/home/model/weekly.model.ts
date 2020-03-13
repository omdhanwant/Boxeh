interface Weekly {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover: string;
            weekly_recipes_section_background: string;
            title: string;
            sub_title: string;
        },
        section_week_recipes: {
            weeks_to_show: [
                {
                    id: string;
                    name: string;
                }
            ],
            single_recipe_content: [
                {
                    tab_pane: string;
                    tablist: [
                        [
                            {
                                id: string;
                                post_name: string;
                                term_id: string;
                                title: string;
                            }
                        ]
                    ],
                    tab_content: [
                        {
                            post_slug: string;
                            id: string;
                            term_id: string;
                        }
                    ]
                },
                {
                    tab_pane: string;
                    tablist: [
                        [
                            {
                                id: string;
                                post_name: string;
                                term_id: string;
                                title: string;
                            }
                        ]
                    ],
                    tab_content: [
                        {
                            post_slug: string;
                            id: string;
                            term_id: string;
                            recipes: [
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                },
                                {
                                    category: [
                                        {
                                            url: string;
                                            name: string;
                                        }
                                    ],
                                    id: string;
                                    title: string;
                                    content: string;
                                    recipe_cooking_time: string;
                                    recipe_extra_info: string;
                                    recipes: [
                                        {
                                            thumbnail: string;
                                            title: string;
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            post_slug: string;
                            id: string;
                            term_id: string;
                        }
                    ]
                }
            ]
        },
        section_footer: {
            button_url: string;
            text: string;
        }
    }
}