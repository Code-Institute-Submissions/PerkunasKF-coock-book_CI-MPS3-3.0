var ingredient = 0;
var direction = 0;
var startOwer = false;

// Start nessesary functions after the page content loads
document.addEventListener('DOMContentLoaded', function () {
  addIngredients ();
  enterIngredient ();
  addDirections();
  enterDirections();
  removeIngredient();
});


// ---
// Generates a list item for recipe ingredients
function addIngredients() {
  var ingredientList = document.getElementById("add_ingredients");
  var ingredientItem = document.createElement("li");
  var ingredientRow = document.createElement("div");
  var ingredientImputCol = document.createElement("div");
  // var ingredientLabel = document.createElement("label");
  var ingredientInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");

  ingredientList.appendChild(ingredientItem);

  ingredientItem.setAttribute("class", "ing-input-field");
  ingredientItem.setAttribute("id", `ingredient-list-item-${ingredient}`);
  ingredientItem.setAttribute("number", `${ingredient}`);
  ingredientItem.appendChild(ingredientRow);

  ingredientRow.setAttribute("class", "row");
  ingredientRow.appendChild(ingredientImputCol);
  ingredientRow.appendChild(remuveBtnCol);
  
  ingredientImputCol.setAttribute("class", "col s9");
  ingredientImputCol.appendChild(ingredientInput);
  // ingredientImputCol.appendChild(ingredientLabel);

  // ingredientLabel.setAttribute("for", "recipe_ingredient");
  // ingredientLabel.appendChild(document.createTextNode("Add ingredient"));

  ingredientInput.setAttribute("name", "recipe_ingredient");
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("class", "recipe_ing");
  ingredientInput.setAttribute("required", "");

  remuveBtnCol.setAttribute("class", "col s3 remuve");
  remuveBtnCol.setAttribute("id", `ingredient-list-item-remuve-${ingredient}`);
  remuveBtnCol.setAttribute("number", `${ingredient}`);
  
  remuveBtnCol.appendChild(remuveBtnText);

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
  console.log(num);

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
  // var ingredientLabel = document.createElement("label");
  var directiontInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");

  directiontList.appendChild(directionItem);

  directionItem.setAttribute("class", "dir-input-field")
  directionItem.appendChild(directiontRow);

  directiontRow.setAttribute("class", "row");
  directiontRow.appendChild(directiontImputCol);
  directiontRow.appendChild(remuveBtnCol);
  
  directiontImputCol.setAttribute("class", "col s9");
  directiontImputCol.appendChild(directiontInput);
  // ingredientImputCol.appendChild(ingredientLabel);

  // ingredientLabel.setAttribute("for", "recipe_ingredient");
  // ingredientLabel.appendChild(document.createTextNode("Add ingredient"));

  directiontInput.setAttribute("name", "recipe_direction");
  directiontInput.setAttribute("type", "text");
  directiontInput.setAttribute("class", "recipe_dir");
  directiontInput.setAttribute("required", "");

  remuveBtnCol.setAttribute("class", "col s3");
  remuveBtnCol.appendChild(remuveBtnText);

  remuveBtnText.appendChild(document.createTextNode("Remuve"));

  direction++;
  return

// Not nessiserty
  // var directiontList = document.getElementById("add-directions");
  // var directionItem = document.createElement("li");
  // var directionInput = document.createElement("input");
  // var directionLabel = document.createElement("label");

  // directionLabel.setAttribute("for", "recipe_directions");
  // directionLabel.setAttribute("class", "direction-holder");
  // directionLabel.appendChild(document.createTextNode("Add direction"));

  // // ingredientInput.setAttribute("id", "recipe_ingredient")
  // directionInput.setAttribute("name", "recipe_direction");
  // directionInput.setAttribute("type", "text");
  // directionInput.setAttribute("class", "recipe_dir");
  // directionInput.setAttribute("required", "");

  // directionItem.setAttribute("class", "input-field")
  // directionItem.appendChild(directionInput);
  // directionItem.appendChild(directionLabel);

  // directiontList.appendChild(directionItem);
  // return
}


// Generates a list after pressing enter after user input
// in add_recipe.html directions list
function enterDirections () {
  document.querySelector('#add-directions').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addDirections();
    }
  });
}
// ---