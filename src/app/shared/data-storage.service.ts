import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

    // Get Recipes, pass to the URL and the put method overrides the data on the server
    storeRecipes() {
        return this.http.put('https://emril-faf6e.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://emril-faf6e.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    // Extract the data of the response and store it in the 'recipes' variable
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        // check if it has an ingredients property
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    // Store in the app
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
