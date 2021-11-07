var ingredient = 0;
var direction = 0;

// Start nessesary functions after the page content loads
document.addEventListener('DOMContentLoaded', function () {
  addIngredients ();
  addDirections();
  enterIngredient ();
  enterDirections();
  removeIngredient();
  removeDirection();
});


// ---
// Generates a list item for recipe ingredients
function addIngredients() {
  var ingredientList = document.getElementById("add_ingredients");
  var ingredientItem = document.createElement("li");
  var ingredientRow = document.createElement("div");
  var ingredientImputCol = document.createElement("div");
  var ingredientInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");

  ingredientList.appendChild(ingredientItem);

  ingredientItem.setAttribute("class", "ing-input-field");
  ingredientItem.setAttribute("id", `ingredient-list-item-${ingredient}`);
  ingredientItem.setAttribute("number", `${ingredient}`);
  ingredientItem.appendChild(ingredientRow);

  ingredientRow.setAttribute("class", "row imput-container");
  ingredientRow.appendChild(ingredientImputCol);
  ingredientRow.appendChild(remuveBtnCol);
  
  ingredientImputCol.setAttribute("class", "col s9");
  ingredientImputCol.appendChild(ingredientInput);

  ingredientInput.setAttribute("name", "recipe_ingredient");
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("class", "recipe_ing");
  ingredientInput.setAttribute("required", "");

  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `ingredient-list-item-remuve-${ingredient}`);
  remuveBtnCol.setAttribute("number", `${ingredient}`);
  
  remuveBtnCol.appendChild(remuveBtnText);

  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text");
  remuveBtnText.appendChild(document.createTextNode("Remuve"));

  ingredient++;
  return
}


// Generates a list after pressing enter after user input
// in add_recipe.html ingredient list
function enterIngredient () {
  document.querySelector('#add_ingredients').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addIngredients();
      removeIngredient ();
    }
  });
}


function removeIngredient() {
  var removeBtns = document.querySelectorAll(".ing-input-field");
  var num;

  var num = parseInt(removeBtns[removeBtns.length-1].getAttribute("number")) + 1;

    for (var i = 0; i < num; ++i) {
      var parent = document.getElementById(`ingredient-list-item-${i}`);
      var btns = document.getElementById(`ingredient-list-item-remuve-${i}`);
    }
    btns.addEventListener("click", () => {
      parent.remove(parent);
    });
  
  return
}
// ---


// ---
// Generates a list item for recipe directions
function addDirections() {
  var directiontList = document.getElementById("add-directions");
  var directionItem = document.createElement("li");
  var directiontRow = document.createElement("div");
  var directiontImputCol = document.createElement("div");
  var directiontInput = document.createElement("textarea");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");

  directiontList.appendChild(directionItem);

  directionItem.setAttribute("class", "dir-input-field");
  directionItem.setAttribute("id", `directions-list-item-${direction}`);
  directionItem.setAttribute("number", `${direction}`);
  directionItem.appendChild(directiontRow);


  directiontRow.setAttribute("class", "row imput-container");
  directiontRow.appendChild(directiontImputCol);
  directiontRow.appendChild(remuveBtnCol);
  
  directiontImputCol.setAttribute("class", "col s9");
  directiontImputCol.appendChild(directiontInput);

  directiontInput.setAttribute("name", "recipe_direction");
  directiontInput.setAttribute("type", "text");
  directiontInput.setAttribute("class", "recipe_dir");
  directiontInput.setAttribute("required", "");

  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `direction-list-item-remuve-${direction}`);
  remuveBtnCol.appendChild(remuveBtnText);

  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text");
  remuveBtnText.appendChild(document.createTextNode("Remuve"));

  direction++;
  return
}


// Generates a list after pressing enter after user input
// in add_recipe.html directions list
function enterDirections () {
  document.querySelector('#add-directions').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addDirections();
      removeDirection();
    }
  });
}

function removeDirection() {
  var removeBtns = document.querySelectorAll(".dir-input-field");
  var num;

  var num = parseInt(removeBtns[removeBtns.length-1].getAttribute("number")) + 1;

    for (var i = 0; i < num; ++i) {
      var parent = document.getElementById(`directions-list-item-${i}`);
      var btns = document.getElementById(`direction-list-item-remuve-${i}`);
    }
    btns.addEventListener("click", () => {
      parent.remove(parent);
    });
  
  return
}
// ---