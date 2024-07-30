#!/usr/bin/env python3
""" Flask set up """


from flask import Flask, render_template
app = Flask(__name__, template_folder="templates")
app.url_map.strict_slashes = False

@app.route("/")
def index():
    """ Renders the index.html """
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)