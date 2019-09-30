from flask import Blueprint, request, jsonify
from usenet_vod.settings.models import DB, User, Setting, UserSetting

settings = Blueprint("settings", __name__)


@settings.route("/", methods=["POST"])
def save_settings():
    body = request.get_json()
    user_settings = body["settings"]  # array of objects
    current_user = User.query.first()

    for setting in user_settings:
        user_setting = UserSetting.query.filter_by(
            user_id=current_user.id, setting_id=setting["id"]
        ).first()

        if user_setting is None:
            user_setting = UserSetting(
                user_id=current_user.id, setting_id=setting["id"]
            )
        user_setting.value = setting["value"]
        DB.session.add(user_setting)
    DB.session.commit()
    return "ok"


@settings.route("/", methods=["GET"])
def get_user_settings():
    current_user = User.query.first()
    return jsonify(
        settings=[
            {"id": s.setting_id, "name": s.setting.name, "value": s.value}
            for s in current_user.settings
        ]
    )


@settings.route("/available", methods=["GET"])
def get_avalilable_settings():
    return jsonify([{"id": s.id, "name": s.name} for s in Setting.query.all()])
