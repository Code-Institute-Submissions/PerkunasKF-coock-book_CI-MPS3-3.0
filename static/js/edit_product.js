var product = 0;

// Start nessesary functions after the page content loads
document.addEventListener('DOMContentLoaded', function () {
  callForRemuve();
  enterproductEdit ();
  removeProduct();
});


// Gets the length of the ingredient and directions list
// Seds request for remove function to delete specifict item
function callForRemuve() {
  var list = document.getElementsByClassName("edit-des-input-field");

  for (var i = 0; i < list.length; i++) {
    var parent = document.getElementById(`edit-description-list-item-${i}`);
    var btn = document.getElementById(`edit-description-list-item-remuve-${i}`);
    remuve(parent, btn);
  }
}


// Removes old ingredients list
function remuve(parent, btn) {
  btn.addEventListener("click", () => {
    parent.remove(parent);
  });
return
}


// ---
// Generates a list item for recipe products
function addProductsEdit() {
  var productList = document.getElementById("edit_description");
  var productDes = document.createElement("li");

  var productRow = document.createElement("div");
  var productImputCol = document.createElement("div");

  var productInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");
  var remuveBtnTextSmall = document.createElement("p");

  productList.appendChild(productDes);

  // Creates clases and ids for li and host row
  productDes.setAttribute("class", "des-input-field");
  productDes.setAttribute("id", `product-list-item-${product}`);
  productDes.setAttribute("data-number", `${product}`);
  productDes.appendChild(productRow);

  // Creats a row for input field and remuve button
  productRow.setAttribute("class", "row imput-container");
  productRow.appendChild(productImputCol);
  productRow.appendChild(remuveBtnCol);
  
  // Creates container for input field
  productImputCol.setAttribute("class", "col s9");
  productImputCol.appendChild(productInput);

  // Creates input field
  productInput.setAttribute("name", "product_description");
  productInput.setAttribute("type", "text");
  productInput.setAttribute("class", "recipe_ing");
  productInput.setAttribute("required", "");

  // Creates remuve button
  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `product-list-item-remuve-${product}`);
  remuveBtnCol.setAttribute("data-number", `${product}`);
  
  // Moves text to remove button
  remuveBtnCol.appendChild(remuveBtnText);
  remuveBtnCol.appendChild(remuveBtnTextSmall);

  // create text for big screens
  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text big-catalog");
  remuveBtnText.appendChild(document.createTextNode("Remove"));

  // Creates text for small screens
  remuveBtnTextSmall.setAttribute("class", "remuve-btn-text center awarege-text small-catalog");
  remuveBtnTextSmall.appendChild(document.createTextNode("X"));

  product++;
  return;
}


// Generates a list after pressing enter after user input
// in add_recipe.html product list
function enterproductEdit () {
  document.querySelector('#edit-descriptions-button').addEventListener('click', function () {
    addProductsEdit();
    removeProduct ();
  });
}


// Selects all of the list items generated with induvidual ids
// Add remove function for all remuve buttons
function removeProduct() {
  var removeBtns = document.querySelectorAll(".des-input-field");
  var num;
  var btns;

  num = parseInt(removeBtns[removeBtns.length-1].getAttribute("data-number")) + 1;

    for (var i = 0; i < num; ++i) {
      var parent = document.getElementById(`product-list-item-${i}`);
      btns = document.getElementById(`product-list-item-remuve-${i}`);
    }
    btns.addEventListener("click", () => {
      parent.remove(parent);
    });
  
  return;
}
// ---