from flask import Flask, jsonify, render_template, send_from_directory
import os

# Define la app y la carpeta donde está el frontend
app = Flask(__name__, static_folder="ecommerce_sexshop/frontend", template_folder="ecommerce_sexshop/frontend")

# Ruta principal: sirve index.html
@app.route("/")
def index():
    return render_template("index.html")

# Ruta para archivos estáticos como CSS, JS, imágenes
@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

# Ruta para el carrusel de imágenes
@app.route("/api/carousel_images")
def get_carousel_images():
    return jsonify([
        {"url": "/static/img/banner1.jpg", "alt": "Imagen 1"},
        {"url": "/static/img/banner2.jpeg", "alt": "Imagen 2"},
        {"url": "/static/img/banner3.jpeg", "alt": "Imagen 3"}
    ])