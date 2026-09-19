import { YOUTUBE_API_KEY } from "../config/env";
import { Song } from "../types";

const BASE = "https://www.googleapis.com/youtube/v3";
type Item = {
  id: string | { videoId?: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { high?: { url: string }; medium?: { url: string } };
  };
};
const decode = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
const map = (item: Item): Song => ({
  id: typeof item.id === "string" ? item.id : item.id.videoId ?? "",
  youtubeVideoId: typeof item.id === "string" ? item.id : item.id.videoId,
  title: decode(item.snippet.title),
  artist: decode(item.snippet.channelTitle),
  artwork:
    item.snippet.thumbnails.high?.url ??
    item.snippet.thumbnails.medium?.url ??
    "",
});
const request = async (path: string) => {
  if (!YOUTUBE_API_KEY)
    throw new Error("Add YOUTUBE_API_KEY to your .env file.");
  const response = await fetch(`${BASE}${path}&key=${YOUTUBE_API_KEY}`);
  const json = await response.json();
  if (!response.ok)
    throw new Error(json?.error?.message ?? "YouTube request failed");
  return (json.items ?? []).map(map).filter((song: Song) => song.id);
};
export const getPopularMusic = () =>
  request(
    "/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=BD&maxResults=15"
  );
export const getNewMusic = () =>
  request(
    `/search?part=snippet&type=video&videoCategoryId=10&order=date&regionCode=BD&maxResults=15&q=${encodeURIComponent(
      "official music"
    )}`
  );
export const searchMusic = (query: string) =>
  request(
    `/search?part=snippet&type=video&videoCategoryId=10&order=relevance&regionCode=BD&maxResults=25&q=${encodeURIComponent(
      query
    )}`
  );
