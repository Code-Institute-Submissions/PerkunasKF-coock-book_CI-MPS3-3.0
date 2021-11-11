import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import random
import cloudinary
from cloudinary.uploader import upload

if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


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


@app.route("/get_recipes")
def get_recipes():
    recipes = list(mongo.db.recipes.find())
    random_recipe = random.sample(recipes, 3)
    return render_template(
        "recipes.html", recipes=recipes,
        random_recipe=random_recipe)


@app.route("/get_products")
def get_products():
    products = list(mongo.db.products.find())
    random_products = random.choices(products)
    products_onsale = random.sample(products, 2)
    return render_template(
        "products.html", products=products,
        random_products=random_products,
        products_onsale=products_onsale)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))

        if request.form.get("password") != request.form.get("password_confirm"):
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


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            if check_password_hash(
                existing_user["password"], request.form.get("password")):
                    session["user"] = request.form.get("username").lower()
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


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    recipes = list(mongo.db.recipes.find())
    user_id = mongo.db.users.find_one(
        {"username": session["user"]})["_id"]
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    user_image = mongo.db.users.find_one(
        {"username": session["user"]})["user_image"]
    if session["user"]:
        return render_template(
            "profile.html", recipes=recipes,
            username=username,
            user_image=user_image, user_id=user_id)

    return redirect(url_for("login"))


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
                "password": generate_password_hash(request.form.get("password")),
                "user_image": request.form.get("user_image")
            }
        mongo.db.users.update({"_id": ObjectId(user_id)}, user)
        flash("Profile Information Edited Successfully")
        return redirect(url_for(
                "profile", username=session["user"]))

    userdata = mongo.db.users.find_one(
        {"_id": ObjectId(user_id)})
    return render_template('edit_profile.html',
        username=session['user'], userdata=userdata,
        user_image=user_image)


@app.route("/logout")
def logout():
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("login"))


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
        flash("Recipy added Successfully")
        return redirect(url_for("profile", username=session["user"]))
    return render_template("add_recipe.html")


@app.route("/edit_recipe/<recipe_id>", methods=["GET", "POST"])
def edit_recipe(recipe_id):
    if request.method == "POST":
        recipe = {
            "recipe_name": request.form.get("recipe_name"),
            "recipe_ingredients": request.form.getlist("recipe_ingredient"),
            "recipe_directions": request.form.getlist("recipe_direction"),
            "meal_type": request.form.get("meal_type"),
            "author": session["user"],
            "recipe_image": request.form.get("recipe_image")
        }
        mongo.db.recipes.update({"_id": ObjectId(recipe_id)}, recipe)
        flash("Recipy edited Successfully")

    recipes_list = list(mongo.db.recipes.find())
    recipe_select = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    return render_template(
        "edit_recipe.html",
        recipe_select=recipe_select, recipes_list=recipes_list)


@app.route("/delete_recipe/<recipe_id>")
def delete_recipe(recipe_id):
    mongo.db.recipes.remove({"_id": ObjectId(recipe_id)})
    flash("Recipy deleted Successfully")
    return redirect(url_for("profile", username=session["user"]))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)