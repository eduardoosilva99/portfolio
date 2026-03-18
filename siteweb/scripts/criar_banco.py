import sqlite3

conn = sqlite3.connect("database.db")

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS usuarios(
id INTEGER PRIMARY KEY AUTOINCREMENT,
usuario TEXT NOT NULL,
senha TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("Banco de dados criado com sucesso")