import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params

    // "Subscribe" to weather or not the user is in Edit mode, and what item is selected
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;

          // Initializing Reactive Form defined below
          this.initForm();
        }
      );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  // add new control to array of controls
  onAddIngredient() {
    // Explicity cast
   (<FormArray>this.recipeForm.get('ingredients')).push(
     new FormGroup({
       'name': new FormControl(null, Validators.required),
       'amount': new FormControl(null, [
          Validators.required,
          // validator is that the number is a positive number greater than 0
          Validators.pattern(/^[1-9]+[0-9]*$/)
       ])
     })
   );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // Decides what value should be WHEN in edit mode
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // Figure out if the recipe has any "ingredients"
      if (recipe['ingredients']) {

        // loop through ingredients and push them to form array
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(

            // Makes recipe name and ingredient available to form
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    // Recative Forms implimentation, includes recipeName as default value which can be empty string or name of recipe selected
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
