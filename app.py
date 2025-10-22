from flask import Flask, jsonify, render_template, send_from_directory
import os

app = Flask(__name__, static_folder="../frontend", template_folder="../frontend")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

@app.route("/api/carousel_images")
def get_carousel_images():
    return jsonify([
        {"url": "/img/banner1.jpg", "alt": "Imagen 1"},
        {"url": "/img/banner2.jpeg", "alt": "Imagen 2"},
        {"url": "/img/banner3.jpeg", "alt": "Imagen 3"}
    ])