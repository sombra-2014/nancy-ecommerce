from flask import Flask, jsonify
from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__, static_folder="ecommerce_sexshop/frontend", template_folder="ecommerce_sexshop/frontend")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)



@app.route('/api/carousel_images')
def get_carousel_images():
    return jsonify([
        {"url": "/static/img/carrusel1.jpg", "alt": "Imagen 1"},
        {"url": "/static/img/carrusel2.jpg", "alt": "Imagen 2"},
        {"url": "/static/img/carrusel3.jpg", "alt": "Imagen 3"}
    ])