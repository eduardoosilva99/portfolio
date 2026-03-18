from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/pagina")
def pagina():
    return render_template("pagina.html")


@app.route("/login", methods=["POST"])
def login():

    usuario = request.form["usuario"]
    senha = request.form["senha"]

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM usuarios WHERE usuario=? AND senha=?",
        (usuario, senha)
    )

    user = cursor.fetchone()

    conn.close()

    if user:
        return redirect("/pagina")
    else:
        return "Usuário ou senha incorretos"


if __name__ == "__main__":
    app.run(debug=True)