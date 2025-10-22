from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder="ecommerce_sexshop/frontend", template_folder="ecommerce_sexshop/frontend")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)