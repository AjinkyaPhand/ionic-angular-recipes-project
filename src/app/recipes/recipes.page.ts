import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {


  constructor(private serviceObject: RecipesService) { }

  recipes: Recipe[];

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.recipes = this.serviceObject.GetAllRecipes()
    console.log("ionViewWillEnter")
  }

  ionViewDidEnter(){
    console.log("ionViewWDidEnter")
  }

  ionViewWillLeave(){
    console.log("ionViewWillLeave")
  }

  ionViewDidLeave(){
    console.log("ionViewDidLeave");
  }

  ngOnDestroy(){
    console.log("Destroyed");
  }

}
