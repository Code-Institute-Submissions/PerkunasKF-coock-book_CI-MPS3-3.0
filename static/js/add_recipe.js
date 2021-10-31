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

  ingredientItem.setAttribute("class", "input-field")
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
      startOwer = true;
    }
  });
}


function removeIngredient () {
  var note = document.getElementsByClassName('remuve');
  var listItem = document.getElementsByClassName('input-field');
  var allList = document.getElementById("add_ingredients");

  console.log(note.length);
  if (note.length > 1) {
    for (var i = 0; i < note.length; i++) {
      note[i].addEventListener("click", function () {

        // console.log(listItem[i]);
        allList.removeChild(listItem[i]);
        // console.log(note[i].parentNode.parentNode);
        // note[i].parentNode.parentNode.remove();
        if (startOwer == true) {
          startOwer = false;
          return
        }
      });
    }
  }
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

  directionItem.setAttribute("class", "input-field")
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