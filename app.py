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
    return render_template("register.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)