document.addEventListener('DOMContentLoaded', function () {
  addIngredients ();
  enterIngredient ();
  addDirections();
  enterDirections();
});


function addIngredients() {
  var ingredientList = document.getElementById("add_ingredients");
  var ingredientItem = document.createElement("li");
  var ingredientInput = document.createElement("input");
  var ingredientLabel = document.createElement("label");

  ingredientLabel.setAttribute("for", "recipe_ingredient");
  ingredientLabel.setAttribute("class", "ingredient-holder");
  ingredientLabel.appendChild(document.createTextNode("Add ingredient"));

  // ingredientInput.setAttribute("id", "recipe_ingredient")
  ingredientInput.setAttribute("name", "recipe_ingredient");
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("class", "recipe_ing");
  ingredientInput.setAttribute("required", "");

  ingredientItem.setAttribute("class", "input-field")
  ingredientItem.appendChild(ingredientInput);
  ingredientItem.appendChild(ingredientLabel);

  ingredientList.appendChild(ingredientItem);
  return
}


function enterIngredient () {
  document.querySelector('#add_ingredients').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addIngredients();
    }
  });
}


function addDirections() {
  var directiontList = document.getElementById("add-directions");
  var directionItem = document.createElement("li");
  var directionInput = document.createElement("input");
  var directionLabel = document.createElement("label");

  directionLabel.setAttribute("for", "recipe_directions");
  directionLabel.setAttribute("class", "direction-holder");
  directionLabel.appendChild(document.createTextNode("Add direction"));

  // ingredientInput.setAttribute("id", "recipe_ingredient")
  directionInput.setAttribute("name", "recipe_direction");
  directionInput.setAttribute("type", "text");
  directionInput.setAttribute("class", "recipe_dir");
  directionInput.setAttribute("required", "");

  directionItem.setAttribute("class", "input-field")
  directionItem.appendChild(directionInput);
  directionItem.appendChild(directionLabel);

  directiontList.appendChild(directionItem);
  return
}


function enterDirections () {
  document.querySelector('#add-directions').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addDirections();
    }
  });
}