import logging
import requests
from typing import Dict

NZBGEEK_API_URL = "https://api.nzbgeek.info/api"
TV_HD_CATEGORY = "5040"
TV_SD_CATEGORY = "5030"

logger = logging.getLogger(__name__)


def search(api_key: str, tvdb_id: str, s_num: str, e_num: str, hd: bool = True) -> Dict:
    """
    Search NZBgeek and return an episode description dict
    :param api_key: key to use in the search
    :param tvdb_id: id of the show to search
    :param s_num: wanted season number
    :param e_nun: wanted episode number
    :param hd: search hd or sd
    """

    logger.debug(f"searching episode, params: {api_key} {tvdb_id} {s_num} {e_num} {hd}")

    req = requests.get(
        NZBGEEK_API_URL,
        params={
            "apikey": api_key,
            "o": "json",
            "t": "tvsearch",
            "limit": 1,
            "tvdbid": tvdb_id,
            "season": s_num,
            "ep": e_num,
            "cat": TV_HD_CATEGORY if hd else TV_SD_CATEGORY,
        },
    )

    if req.status_code != 200:
        logger.error("failed to search, error_code: {req.status_code}, msg: {req.text}")

    results = req.json()
    return results.get("channel", {}).get("item")[0]

