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
        {"url": "/static/img/banner1.jpg", "alt": "Imagen 1"},
        {"url": "/static/img/banner2.jpeg", "alt": "Imagen 2"},
        {"url": "/static/img/banner3.jpeg", "alt": "Imagen 3"}
    ])


from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="../frontend", static_url_path="")

@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

    


    from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')