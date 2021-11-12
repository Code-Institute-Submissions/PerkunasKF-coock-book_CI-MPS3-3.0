var product = 0;

// Start nessesary functions after the page content loads
document.addEventListener('DOMContentLoaded', function () {
  addProducts ();
  enterproduct ();
  removeProduct();
});


// ---
// Generates a list item for recipe products
function addProducts() {
  var productList = document.getElementById("add_products");
  var productDes = document.createElement("li");

  var productRow = document.createElement("div");
  var productImputCol = document.createElement("div");

  var productInput = document.createElement("input");
  var remuveBtnCol = document.createElement("div");
  var remuveBtnText = document.createElement("p");
  var remuveBtnTextSmall = document.createElement("p");

  productList.appendChild(productDes);

  productDes.setAttribute("class", "des-input-field");
  productDes.setAttribute("id", `product-list-item-${product}`);
  productDes.setAttribute("number", `${product}`);
  productDes.appendChild(productRow);

  productRow.setAttribute("class", "row imput-container");
  productRow.appendChild(productImputCol);
  productRow.appendChild(remuveBtnCol);
  
  productImputCol.setAttribute("class", "col s9");
  productImputCol.appendChild(productInput);

  productInput.setAttribute("name", "product_description");
  productInput.setAttribute("type", "text");
  productInput.setAttribute("class", "recipe_ing");
  productInput.setAttribute("required", "");

  remuveBtnCol.setAttribute("class", "col s3 remuve-btn");
  remuveBtnCol.setAttribute("id", `product-list-item-remuve-${product}`);
  remuveBtnCol.setAttribute("number", `${product}`);
  
  remuveBtnCol.appendChild(remuveBtnText);
  remuveBtnCol.appendChild(remuveBtnTextSmall);

  remuveBtnText.setAttribute("class", "remuve-btn-text center awarege-text big-catalog");
  remuveBtnText.appendChild(document.createTextNode("Remuve"));

  remuveBtnTextSmall.setAttribute("class", "remuve-btn-text center awarege-text small-catalog");
  remuveBtnTextSmall.appendChild(document.createTextNode("X"));

  product++;
  return
}


// Generates a list after pressing enter after user input
// in add_recipe.html product list
function enterproduct () {
  document.querySelector('#add_products').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addProducts();
      removeProduct ();
    }
  });
}


function removeProduct() {
  var removeBtns = document.querySelectorAll(".ing-input-field");
  var num;

  var num = parseInt(removeBtns[removeBtns.length-1].getAttribute("number")) + 1;

    for (var i = 0; i < num; ++i) {
      var parent = document.getElementById(`product-list-item-${i}`);
      var btns = document.getElementById(`product-list-item-remuve-${i}`);
    }
    btns.addEventListener("click", () => {
      parent.remove(parent);
    });
  
  return
}
// ---