var ingredient = 0;

document.addEventListener('DOMContentLoaded', function () {
  console.log("Pradzia");
  callForRemuveRecipe();

  enterIngredientEdit();
  enterDirectionsEdit();
});


// ------------------------------------------------------
// Remove function block fro old ingredient adn directions list

// Gets the length of the ingredient and directions list
// Seds request for remove function to delete specifict item
function callForRemuveRecipe() {
  console.log("callForRemuve");
  var list = document.getElementsByClassName("edit-ing-input-field");
  var directionList = document.getElementsByClassName("edit-dir-input-field");

  for (var i = 0; i < list.length; i++) {
    var parent = document.getElementById(`edit-ingredient-list-item-${i}`);
    var btn = document.getElementById(`edit-ingredient-list-item-remuve-${i}`);
    remuve(parent, btn);
  }

  for (var i = 0; i < directionList.length; i++) {
    var parent02 = document.getElementById(`edit-directions-list-item-${i}`);
    var btn02 = document.getElementById(`edit-direction-list-item-remuve-${i}`);
    remuve02(parent02, btn02);
  }
} 


// Removes old ingredients list
function remuve(parent, btn) {
    btn.addEventListener("click", () => {
      parent.remove(parent);
      console.log("Helo");
    });
  return
}


// Removes old directions list
function remuve02(parent, btn) {
  btn.addEventListener("click", () => {
    parent.remove(parent);
    console.log("Helo");
  });
return
}
// ------------------------------------------------------


// ------------------------------------------------------
// Generates a list item for recipe ingredients
function addIngredientsEdit () {
  var ingredientList = document.getElementById("edit_ingredients");
  var ingredientItem = document.createElement("li");
  var ingredientRow = document.createElement("div");
  var ingredientImputCol = document.createElement("div");
  var ingredientInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");
  var remuveBtnTextSmall = document.createElement("p");

  ingredientList.appendChild(ingredientItem);

  // Creates clases and ids for li and host row
  ingredientItem.setAttribute("class", "ing-input-field");
  ingredientItem.setAttribute("id", `ingredient-list-item-${ingredient}`);
  ingredientItem.setAttribute("number", `${ingredient}`);
  ingredientItem.appendChild(ingredientRow);

  // Creats a row for input field and remuve button
  ingredientRow.setAttribute("class", "row");
  ingredientRow.appendChild(ingredientImputCol);
  ingredientRow.appendChild(remuveBtnCol);
  
  // Creates container for input field
  ingredientImputCol.setAttribute("class", "col s9");
  ingredientImputCol.appendChild(ingredientInput);

  // Creates input field
  ingredientInput.setAttribute("name", "recipe_ingredient");
  ingredientInput.setAttribute("type", "text");
  ingredientInput.setAttribute("class", "recipe_ing");
  ingredientInput.setAttribute("required", "");

  // Creates remuve button
  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `ingredient-list-item-remuve-${ingredient}`);
  remuveBtnCol.setAttribute("number", `${ingredient}`);
  
  // Moves text to remove button
  remuveBtnCol.appendChild(remuveBtnText);
  remuveBtnCol.appendChild(remuveBtnTextSmall);

  // create text for big screens
  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text big-catalog");
  remuveBtnText.appendChild(document.createTextNode("Remove"));

  // Creates text for small screens
  remuveBtnTextSmall.setAttribute("class", "remuve-btn-text center awarege-text small-catalog");
  remuveBtnTextSmall.appendChild(document.createTextNode("X"));

  ingredient++;
  return
}


// Generates a list after pressing enter after user input
// in add_recipe.html ingredient list
function enterIngredientEdit () {
  document.querySelector('#edit-ingredients-button').addEventListener('click', function () {
      addIngredientsEdit ();
      removeIngredient();
  });
}


// Selects all of the list items generated with induvidual ids
// Add remove function for all remuve buttons
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
// ------------------------------------------------------


// ------------------------------------------------------
// Generates a list item for recipe directions
function addDirectionsEdit () {
  var directiontList = document.getElementById("edit-directions");
  var directionItem = document.createElement("li");
  var directiontRow = document.createElement("div");
  var directiontImputCol = document.createElement("div");
  var directiontInput = document.createElement("textarea");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");
  var remuveBtnTextSmall = document.createElement("p");

  directiontList.appendChild(directionItem);

  // Creates clases and ids for li and host row
  directionItem.setAttribute("class", "dir-input-field");
  directionItem.setAttribute("id", `directions-list-item-${direction}`);
  directionItem.setAttribute("number", `${direction}`);
  directionItem.appendChild(directiontRow);

  // Creats a row for input field and remuve button
  directiontRow.setAttribute("class", "row");
  directiontRow.appendChild(directiontImputCol);
  directiontRow.appendChild(remuveBtnCol);
  
  // Creates container for input field
  directiontImputCol.setAttribute("class", "col s9");
  directiontImputCol.appendChild(directiontInput);

  // Creates input field
  directiontInput.setAttribute("name", "recipe_direction");
  directiontInput.setAttribute("type", "text");
  directiontInput.setAttribute("class", "recipe_dir");
  directiontInput.setAttribute("required", "");

  // Creates remuve button
  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `direction-list-item-remuve-${direction}`);

  // Moves text to remove button
  remuveBtnCol.appendChild(remuveBtnText);
  remuveBtnCol.appendChild(remuveBtnTextSmall);

  // create text for big screens
  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text big-catalog");
  remuveBtnText.appendChild(document.createTextNode("Remove"));

  // Creates text for small screens
  remuveBtnTextSmall.setAttribute("class", "remuve-btn-text center awarege-text small-catalog");
  remuveBtnTextSmall.appendChild(document.createTextNode("X"));

  direction++;
  return
}


// Generates a list after pressing enter after user input
// in add_recipe.html directions list
function enterDirectionsEdit () {
  document.querySelector('#edit-direction-buttno').addEventListener('click', function () {
      addDirectionsEdit();
      removeDirection();
  });
}


// Selects all of the list items generated with induvidual ids
// Add remove function for all remuve buttons
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
// ------------------------------------------------------