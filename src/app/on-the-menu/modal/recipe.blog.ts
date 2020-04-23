export interface RecipeBlog {
    code: number;
    status: boolean;
    message: string;
    data: {
        category: 
            {
                id: number;
                name: string;
            }[]
        ,
        title: string;
        the_post_thumbnail_url: string;
        author_avatar_url: string;
        author_display_name: string;
        the_content: string;
        ingredients_data: {
            recipe_ingredients: 
                {
                    ingredient_Title: string;
                    ingredient_Image: string;
                }[]
        },
        nutritional_value_note:string;
        recipe_nutritional_facts:{
            amount_per_serving:string;
            calories_text:string;
            calories_value:string;
            daily_value:string;
            serving_size:string;
            servings:string;
            title:string;
        }
        customer_favorite: string;
        recipe_cooking_time: string;
        recipe_extra_info: string;
        recipe_nutritional_values: [],
        recipe_nutritional_values_2: [],
        recipe_utensils: []
    }
}