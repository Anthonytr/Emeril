import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getRecipes();
  }
}
