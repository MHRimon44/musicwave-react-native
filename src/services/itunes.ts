import { Song } from "../types";

const BASE_URL = "https://itunes.apple.com/search";

type ITunesTrack = {
  trackId?: number;
  trackName?: string;
  artistName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  wrapperType?: string;
  kind?: string;
};

type ITunesResponse = {
  resultCount: number;
  results: ITunesTrack[];
};

const makeArtworkLarge = (url = "") =>
  url.replace(/100x100bb/g, "600x600bb");

const mapTrack = (track: ITunesTrack): Song | null => {
  if (!track.trackId || !track.trackName || !track.previewUrl) return null;

  return {
    id: String(track.trackId),
    title: track.trackName,
    artist: track.artistName ?? "Unknown artist",
    artwork: makeArtworkLarge(track.artworkUrl100),
    audioUrl: track.previewUrl,
    duration: track.trackTimeMillis
      ? Math.round(track.trackTimeMillis / 1000)
      : undefined,
  };
};

async function request(term: string, limit = 25): Promise<Song[]> {
  const params = [
    `term=${encodeURIComponent(term.trim())}`,
    "media=music",
    "entity=song",
    `limit=${limit}`,
    "country=US",
    "explicit=No",
  ].join("&");

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Unable to load playable music. Please try again.");
  }

  const data = (await response.json()) as ITunesResponse;
  return data.results
    .map(mapTrack)
    .filter((song): song is Song => song !== null);
}

export const searchMusic = (query: string) => request(query, 25);

// The free Search API has no true popularity chart endpoint. These broad
// editorial searches provide a useful playable home feed for a demo app.
export const getPopularMusic = () => request("top hits", 15);
export const getNewMusic = () => request("new music", 15);
