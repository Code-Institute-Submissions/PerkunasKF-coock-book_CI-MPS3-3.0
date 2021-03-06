import os
import random

from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# Render the home page
@app.route("/")
@app.route("/home")
def home():
    recipes = list(mongo.db.recipes.find())
    random_recipe = random.sample(recipes, 3)
    products = list(mongo.db.products.find())
    products_onsale = random.sample(products, 2)
    return render_template(
        "home.html", recipes=recipes,
        random_recipe=random_recipe,
        products_onsale=products_onsale)


# Render the recipe page with all recipes
@app.route("/get_recipes")
def get_recipes():
    recipes = list(mongo.db.recipes.find().sort("recipe_name", 1))
    recipes_search = list(mongo.db.recipes.find().sort("recipe_name", 1))
    random_recipe = random.sample(recipes, 3)
    return render_template(
        "recipes.html", recipes=recipes,
        random_recipe=random_recipe,
        recipes_search=recipes_search)


# Render product page with all products
@app.route("/get_products")
def get_products():
    products = list(mongo.db.products.find().sort("product_name", 1))
    products_search = list(mongo.db.products.find().sort("product_name", 1))
    random_products = random.choices(products)
    products_onsale = random.sample(products, 2)
    return render_template(
        "products.html", products=products,
        random_products=random_products,
        products_onsale=products_onsale,
        products_search=products_search)


# Renders redister page
# If user information is valid register and store user data to the database
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))

        if request.form.get(
            "password") != request.form.get("password_confirm"):
            flash("Password does not match!")
            return redirect(url_for('register'))

        register_data = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "user_image": request.form.get("user_image")
        }
        mongo.db.users.insert_one(register_data)

        session["user"] = request.form.get("username").lower()
        flash("Registration Successful! :D")
        return redirect(url_for("profile", username=session["user"]))
    return render_template("register.html")


# Render login page
# If user information is valid logs in usr to the website
# If information is not valid flashes a warnin message
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            if check_password_hash(
                existing_user["password"], request.form.get(
                    "password")):
                    session["user"] = request.form.get(
                        "username").lower()
                    flash("Welcome, {}".format(
                        request.form.get("username")))
                    return redirect(url_for(
                        "profile", username=session["user"]))
            else:
                flash("Incorect Username and/or Password")
                return redirect(url_for('login'))

        else:
            flash("Incorect Username and/or Password")
            return redirect(url_for('login'))
    return render_template("login.html")


# Render profile page
# Users ssesion user to get the right usr id to show corect users information
# Send user image, name and recipes to user profile page
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    recipes = list(mongo.db.recipes.find().sort("recipe_name", 1))
    products = list(mongo.db.products.find().sort("product_name", 1))
    user_id = mongo.db.users.find_one(
        {"username": session["user"]})["_id"]
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    user_image = mongo.db.users.find_one(
        {"username": session["user"]})["user_image"]
    all_users = mongo.db.users.find()
    if session["user"]:
        return render_template(
            "profile.html", recipes=recipes,
            username=username,
            user_image=user_image, user_id=user_id,
            all_users=all_users, products=products)

    return redirect(url_for("login"))


# Render edit profile page
# Check is user change any data if no changes
# then send back the same information
# If changes the information then send and store new informtion on database
@app.route("/edit_profile/<user_id>", methods=["GET", "POST"])
def edit_profile(user_id):
    user_image = mongo.db.users.find_one(
        {"username": session["user"]})["user_image"]
    if request.method == "POST":
        username = mongo.db.users.find_one(
            {"username": session["user"]})["username"]

        if request.form.get("password") == "":
            user_password = mongo.db.users.find_one(
                {"_id": ObjectId(user_id)})["password"]
            user = {
                "username": username,
                "password": user_password,
                "user_image": request.form.get("user_image")
            }
        else:
            user = {
                "username": username,
                "password": generate_password_hash(
                    request.form.get("password")),
                "user_image": request.form.get("user_image")
            }
        mongo.db.users.update({"_id": ObjectId(user_id)}, user)
        flash("Profile Information Edited Successfully")
        return redirect(url_for(
                "profile", username=session["user"]))

    userdata = mongo.db.users.find_one(
        {"_id": ObjectId(user_id)})
    return render_template('edit_profile.html',
        username=session['user'],
        userdata=userdata,
        user_image=user_image)


# Redirects user to log in page
@app.route("/logout")
def logout():
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


# Reders add recipe form
# Stored users inputs to databse
@app.route("/add_recipe", methods=["GET", "POST"])
def add_recipe():
    if request.method == "POST":
        recipe = {
            "recipe_name": request.form.get("recipe_name"),
            "recipe_ingredients": request.form.getlist("recipe_ingredient"),
            "recipe_directions": request.form.getlist("recipe_direction"),
            "meal_type": request.form.get("meal_type"),
            "author": session["user"],
            "recipe_image": request.form.get("recipe_image"),
            "recipe_sug": request.form.get("recipe_sug")
        }
        mongo.db.recipes.insert_one(recipe)
        flash("Recipe added Successfully")
        return redirect(url_for("profile", username=session["user"]))
    return render_template("add_recipe.html")


# Renders edit recipe page
# Gets and show recipe information base on recipes id
# Store curent information to database
@app.route("/edit_recipe/<recipe_id>", methods=["GET", "POST"])
def edit_recipe(recipe_id):
    if request.method == "POST":
        if request.form.get("recipe_image") == "":
            recipe_image = mongo.db.recipes.find_one(
                {"_id": ObjectId(recipe_id)})["recipe_image"]
            recipe = {
                "recipe_name": request.form.get("recipe_name"),
                "recipe_ingredients": request.form.getlist(
                    "recipe_ingredient"),
                "recipe_directions": request.form.getlist("recipe_direction"),
                "meal_type": request.form.get("meal_type"),
                "author": session["user"],
                "recipe_image": recipe_image
            }
        else:
            recipe = {
                "recipe_name": request.form.get("recipe_name"),
                "recipe_ingredients": request.form.getlist(
                    "recipe_ingredient"),
                "recipe_directions": request.form.getlist("recipe_direction"),
                "meal_type": request.form.get("meal_type"),
                "author": session["user"],
                "recipe_image": request.form.get("recipe_image")
            }
        mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, recipe)
        flash("Recipy edited Successfully")
        return redirect(url_for("profile", username=session["user"]))

    recipes_list = list(mongo.db.recipes.find())
    recipe_select = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template(
        "edit_recipe.html",
        recipe_select=recipe_select, recipes_list=recipes_list)


# Redirects user to profile page
# Deletes recipe form database
@app.route("/delete_recipe/<recipe_id>")
def delete_recipe(recipe_id):
    mongo.db.recipes.remove({"_id": ObjectId(recipe_id)})
    flash("Recipy deleted Successfully")
    return redirect(url_for("profile", username=session["user"]))


# Renders add product form
# Store forms information to database
@app.route("/add_product", methods=["GET", "POST"])
def add_product():
    if request.method == "POST":
        product = {
            "product_name": request.form.get("product_name"),
            "product_description": request.form.getlist("product_description"),
            "product_type": request.form.get("product_type"),
            "product_image": request.form.get("product_image")
        }
        mongo.db.products.insert_one(product)
        flash("Product added Successfully")
        return redirect(url_for("profile", username=session["user"]))
    return render_template("add_product.html")


# Renders edit product form
# Get selectede products information base on products id
# Sednd new information to databse and owerides the old one
@app.route("/edit_product/<product_id>", methods=["GET", "POST"])
def edit_product(product_id):
    if request.method == "POST":
        if request.form.get("product_image") == "":
            product_image = mongo.db.products.find_one(
                {"_id": ObjectId(product_id)})["product_image"]
            product = {
                "product_name": request.form.get("product_name"),
                "product_description": request.form.getlist(
                    "product_description"),
                "product_type": request.form.get("product_type"),
                "product_image": product_image
            }
        else:
            product = {
                "product_name": request.form.get("product_name"),
                "product_description": request.form.getlist(
                    "product_description"),
                "product_type": request.form.get("product_type"),
                "product_image": request.form.get("product_image")
            }
        mongo.db.products.update({"_id": ObjectId(product_id)}, product)
        flash("Product edited Successfully")
        return redirect(url_for("profile", username=session["user"]))

    product_list = list(mongo.db.products.find())
    product_select = mongo.db.products.find_one({"_id": ObjectId(product_id)})
    return render_template(
        "edit_product.html",
        product_select=product_select, product_list=product_list)


# Rediercts admin user to profile page
# Deletes user from databse
@app.route("/delete_user/<user_id>")
def delete_user(user_id):
    mongo.db.users.remove({"_id": ObjectId(user_id)})
    flash("User Deleted Successfully")
    return redirect(url_for("profile", username=session["user"]))


# Redirects admin user to profile page
# Deletes product for database
@app.route("/delete_product/<product_id>")
def delete_product(product_id):
    mongo.db.products.remove({"_id": ObjectId(product_id)})
    flash("Product Deleted Successfully")
    return redirect(url_for("profile", username=session["user"]))


# Reload product page with serched objects
# Resets the page
@app.route("/search_products", methods=["GET", "POST"])
def search_products():
    query_product = request.form.get("query_product")
    products_search = list(
        mongo.db.products.find({"$text": {"$search": query_product}}))

    products = list(mongo.db.products.find().sort("product_name", 1))
    random_products = random.choices(products)
    products_onsale = random.sample(products, 2)
    return render_template(
        "products.html", products=products,
        random_products=random_products,
        products_onsale=products_onsale,
        products_search=products_search)


# Reload recipe page with serched objects
# Resets the page
@app.route("/search_recipes", methods=["GET", "POST"])
def search_recipes():
    query_recipe = request.form.get("query_recipe")
    recipes_search = list(
        mongo.db.recipes.find(
            {"$text": {"$search": query_recipe}}))

    recipes = list(mongo.db.recipes.find().sort("recipe_name", 1))
    random_recipe = random.sample(recipes, 3)
    return render_template(
        "recipes.html", recipes=recipes,
        random_recipe=random_recipe,
        recipes_search=recipes_search)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=False)