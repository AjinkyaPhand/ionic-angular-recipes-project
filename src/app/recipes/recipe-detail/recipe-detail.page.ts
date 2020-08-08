import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe;
  recipeID: string;

  constructor(private activatedRoute: ActivatedRoute, private serviceObject: RecipesService
    , private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        if (!params.has('recipeID')) {
          this.router.navigate(['/recipes'])
          return
        }
        this.recipeID = params.get('recipeID')
        this.recipe = this.serviceObject.GetRecipeDetail(this.recipeID)
      }
    )
  }

  onDeleteRecipe() {
    this.alertController.create({
      header: "Are you sure ?",
      message: "Do you really want to delete the recipe ?",
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text:"Delete",
        handler:()=>{
          this.serviceObject.deleteRecipe(this.recipe.id)
          this.router.navigate(['/recipes'])
        }
      }]
    }).then((alertEL)=>{
      alertEL.present()
    })
    
  }

}
