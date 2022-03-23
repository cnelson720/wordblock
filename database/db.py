import sqlite3

conn = sqlite3.connect('hiscores.db')

c = conn.cursor()

c.execute("SELECT * FROM hiscores")



conn.commit()

conn.close()