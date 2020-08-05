import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe;
  recipeID: string;

  constructor(private activatedRoute: ActivatedRoute, private serviceObject: RecipesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        if (!params.has('recipeID')) {
          return
        }
        this.recipeID = params.get('recipeID')
        this.recipe = this.serviceObject.GetRecipeDetail(this.recipeID)
      }
    )
  }

}
