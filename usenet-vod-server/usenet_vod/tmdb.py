import tmdbsimple
from flask import Blueprint, jsonify, request
from flask_caching import Cache
from usenet_vod.utils import select
from usenet_vod.settings.models import User, UserSetting


tmdb = Blueprint("tmdb", __name__)
cache = Cache(config={"CACHE_TYPE": "simple"})
TMDB_SETTING_ID = 1


@tmdb.before_app_first_request
def init_module():
    default_user = User.query.first()
    tmdb_api_key = (
        UserSetting.query.filter_by(user_id=default_user.id, setting_id=TMDB_SETTING_ID)
        .first()
        .value
    )
    tmdbsimple.API_KEY = tmdb_api_key


@tmdb.route("/search/tv/<query>", methods=["GET"])
def search_tmdb_tv(query: str):
    props = ("poster_path", "id", "name")
    search = tmdbsimple.Search()
    response = search.tv(query=query)
    results = [select(r, *props) for r in response["results"]]
    return jsonify(results)


@tmdb.route("/details/tv/<tmdb_id>", methods=["GET"])
@cache.cached(timeout=60 * 60)
def details_tmdb_tv(tmdb_id: str):
    props = (
        "id",
        "name",
        "genres",
        "episodes",
        "overview",
        "poster_path",
        "external_ids",
        "backdrop_path",
    )

    episode_props = (
        "id",
        "name",
        "overview",
        "still_path",
        "season_number",
        "episode_number",
    )

    show = tmdbsimple.TV(tmdb_id)
    response = show.info(append_to_response="external_ids")
    response["episodes"] = [
        select(e, *episode_props)
        for season in response["seasons"]
        for e in tmdbsimple.TV_Seasons(tmdb_id, season["season_number"]).info()[
            "episodes"
        ]
        if season["season_number"] > 0
    ]

    return jsonify(select(response, *props))


@tmdb.route("/popular/tv", methods=["GET"])
def popular_tmdb_tv():
    props = ("poster_path", "id", "name")
    tv = tmdbsimple.TV()
    response = tv.popular(page=request.args.get("page", 1))
    results = [
        select(r, *props) for r in response["results"] if r["poster_path"] is not None
    ]
    return jsonify(results)
