import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipes: Recipe[] = [
    {
      id: "1",
      title: "Noodles",
      url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      ingredients: ["noodels", "salt", "chilli", "sauce"]
    },
    {
      id: "2",
      title: "Chicken",
      url: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      ingredients: ["Water", "salt", "Meat", "Curry"]
    }
  ]
  constructor() { }

  GetAllRecipes(): Recipe[] {
    return [...this.recipes]
  }

  GetRecipeDetail(id: string): Recipe {
    return {
      ...this.recipes.find(item => {
        return item.id === id
      })
    }
  }

  deleteRecipe(recipeID: string) {
    this.recipes = this.recipes.filter((recipe) => {
      return recipe.id !== recipeID
    })
  }

}
