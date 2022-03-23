from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from flaskr.db import get_db

bp = Blueprint('index', __name__)


@bp.route('/', methods=['GET', 'POST'])
def index():

    if request.method == 'POST':
        name = request.form['name']
        wordScore = request.form['wordScore']
        score = request.form['score']

        db = get_db()
        error = None

        if not name:
            error = 'must enter a name'
        
        if error is None:
            try:
                db.execute(
                    "INSERT INTO hiscores (name, wordScore, score) VALUES (?, ?, ?)",
                    (name, wordScore, score)
                )

                db.commit()
            except db.IntegrityError:
                error = f"Name {name} already exists"
            else:
                return redirect(url_for('hiscores.hiscores'))
        flash(error)
        
    


    return render_template('index.html')