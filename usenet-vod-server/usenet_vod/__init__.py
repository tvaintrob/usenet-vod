from flask import Flask, g
from flask_sqlalchemy import SQLAlchemy
from usenet_vod.tmdb import tmdb, cache
from usenet_vod.nzb import nzb
from usenet_vod.settings import settings, models, DB


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///vod.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    DB.init_app(app)
    cache.init_app(app)

    app.register_blueprint(tmdb, url_prefix="/tmdb")
    app.register_blueprint(nzb, url_prefix="/nzb")
    app.register_blueprint(settings, url_prefix="/settings")

    @app.cli.command("create-db")
    def initialize_database():
        DB.drop_all()
        DB.create_all()

        default_settings = (
            models.Setting(name="TMDb API Key"),
            models.Setting(name="NZBgeek API Key"),
            models.Setting(name="SABnzbd API Key"),
        )

        for s in default_settings:
            DB.session.add(s)

        default_user = models.User(username="admin")
        default_user.set_password("admin")

        default_user.settings.append(
            models.UserSetting(setting_id=1, value="19a733ea0de6ce329ab360b2156ab142")
        )
        default_user.settings.append(
            models.UserSetting(setting_id=2, value="6b10353c93e2d12bd6955fd2738bf8f3")
        )
        DB.session.add(default_user)
        DB.session.commit()

    return app

