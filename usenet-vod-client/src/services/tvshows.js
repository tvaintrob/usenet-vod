import axios from 'axios';

export async function fetchPopularShows(page = 1) {
  const res = await axios.get('/tmdb/popular/tv', { params: { page } });
  return res.data;
}

export async function searchShows(query) {
  const res = await axios.get(`/tmdb/search/tv/${query}`);
  return res.data;
}

export async function fetchShowDetails(showId) {
  const res = await axios.get(`/tmdb/details/tv/${showId}`);
  return res.data;
}

export async function fetchNzbUrl(tvdbId, season, episode) {
  const res = await axios.get(`/nzb/find/${tvdbId}/${season}/${episode}`);
  return res.data;
}
