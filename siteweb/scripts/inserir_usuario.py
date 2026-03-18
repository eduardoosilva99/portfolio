import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()

usuario = "admin"
senha = "123456"

cursor.execute(
"INSERT INTO usuarios (usuario, senha) VALUES (?, ?)",
(usuario, senha)
)

conn.commit()
conn.close()

print("Usuário inserido com sucesso!")