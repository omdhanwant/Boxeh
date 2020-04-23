export interface RecipeCategory{
        code: number;
        status: boolean
        message: string;
        data: {
            recipes:{
                    id: number;
                    title: string;
                    content:string;
                    post_thumbnail_url: string;
                    recipe_cooking_time: number;
                    recipe_extra_info: string;
                }[]
        }
    }