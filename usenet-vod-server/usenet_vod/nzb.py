from flask import Blueprint, jsonify, request
from usenet_vod import nzbgeek
from usenet_vod.settings.models import User, UserSetting

nzb = Blueprint("nzb", __name__)
NZBGEEK_API_SETTING_ID = 2


@nzb.route("/find/<tvdb_id>/<season>/<episode>", methods=["GET"])
def nzb_find(tvdb_id, season, episode):
    current_user = User.query.first()
    api_key = (
        UserSetting.query.filter_by(
            user_id=current_user.id, setting_id=NZBGEEK_API_SETTING_ID
        )
        .first()
        .value
    )
    hd = request.args.get("hd", "0") == "1"
    res = nzbgeek.search(api_key, tvdb_id, season, episode, hd=hd)

    return jsonify(
        link=res["link"],
        title=res["title"],
        size=res["enclosure"]["@attributes"]["length"],
    )
