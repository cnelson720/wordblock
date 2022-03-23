from flask import (
    Flask, Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from flaskr.db import get_db

bp = Blueprint('hiscores', __name__)


@bp.route('/hiscores', methods=['GET', 'POST'])
def hiscores():
    db = get_db()

    c = db.cursor()

    c.execute("SELECT * FROM hiscores")
    data = c.fetchall()

    return render_template('hiscores.html', data=data)