var profileImg = false;
var productImg = false;

// Cloudinary widjet script for proping a field for
// image upload
var myWidget = cloudinary.applyUploadWidget(
    document.getElementById('opener'), 
    { cloudName: "silorak", uploadPreset: "e6rwssw9", folder: "coock_book-img" }, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);

      if (profileImg == true) {
        var userImg = document.getElementById("user_image");
        userImg.setAttribute("value", result.info['secure_url']);
        profileImg = false;
        console.log("1");
      } else {
        if ( productImg == true ) {
          var productImage = document.getElementById("product_image");
          productImage.setAttribute("value", result.info['secure_url']);
          productImg = false;
          console.log("2");
        } else {
            var recipeImg = document.getElementById("recipe_image");
            recipeImg.setAttribute("value", result.info['secure_url']);
            console.log("3");

        }
      }
    }
  }
)


  document.getElementById("upload_widget").addEventListener("click", function () {
    // changeProfileImage();
    // var profilePic = document.getElementsByClassName("profile-pic-edit");
    var check = document.getElementById("upload_widget");
      if (check.getAttribute("profile") == "profile") {
        profileImg = true
        console.log(profileImg);
        console.log(check);
      }
      if (check.getAttribute("product") == "product") {
        productImg = true
        console.log(check);
      }
    myWidget.open();
  }, false);

  

function changeProfileImage () {
  // var imageContainer = document.querySelector("profile-pic-edit");
  var submitButton = document.createElement("button");
  var cardContainer = document.getElementsByClassName("info-user");

    cardContainer.appendChild(submitButton);
    submitButton.setAttribute("class", "remuve-btn-text center awarege-text big-catalog");
    submitButton.appendChild(document.createTextNode("Save Changes"));
  return
}

