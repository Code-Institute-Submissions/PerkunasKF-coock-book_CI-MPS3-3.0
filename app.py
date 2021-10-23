import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import random
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
@app.route("/get_recipes")
def get_recipes():
    recipes = mongo.db.recipes.find()
    recipe_list = []
    for recipe in recipes:
        recipe_list.append(recipe)
    random_recipe = random.choices(recipe_list)
    recipes_01 = mongo.db.recipes.find()
    recipes_02 = mongo.db.recipes.find()
    recipes_03 = mongo.db.recipes.find()
    return render_template(
        "recipes.html", recipes_01=recipes_01,
        recipes_02=recipes_02, recipes_03=recipes_03,
        random_recipe=random_recipe)


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

        existing_email = mongo.db.users.find_one(
            {"email": request.form.get("email").lower()})

        if existing_email:
            flash("Email already exists!")
            return redirect(url_for("register"))

        register_data = {
            "username": request.form.get("username").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "email": request.form.get("email").lower()
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
    recipes = mongo.db.recipes.find()
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]
    email = mongo.db.users.find_one(
        {"username": session["user"]})["email"]
    return render_template("profile.html", recipes=recipes, username=username, email=email)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)