var myWidget = cloudinary.applyUploadWidget(
    document.getElementById('opener'), 
    { cloudName: "silorak", uploadPreset: "e6rwssw9", folder: "coock_book-img" }, (error, result) => { 
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info);

      var recipeImg = document.getElementById("recipe_image");

      recipeImg.setAttribute("value", result.info['secure_url']);
    }
  }
)

document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);