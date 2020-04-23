interface RecipeLibrary {
    code: number;
    status: boolean;
    message: string;
    data: {
        page_head: {
            bg_cover:string;
            title: string;
            sub_title:string;
        },
        secion_recipes: {
            recipes_list: [
                {
                    id:number;
                    title:string;
                    thumbnail_url:string;
                    content:string;
                    categories:
                    {
                        id:number;
                        name: string;
                    }[],
                    weeks:string;
                    recipe_cooking_time: string;
                    recipe_extra_info: string;
                }
            ]
        },
        section_footer: {
            button_url: string;
            text: string;
        }
    }
}