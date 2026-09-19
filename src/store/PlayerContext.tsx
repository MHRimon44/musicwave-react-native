import TrackPlayer, { PlayerCommand, useActiveMediaItem } from "@rntp/player";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert } from "react-native";
import { Song } from "../types";
type Value = {
  current?: Song;
  queue: Song[];
  playSong: (song: Song, queue?: Song[]) => Promise<boolean>;
};
const Context = createContext<Value | null>(null);
export function PlayerProvider({ children }: React.PropsWithChildren) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      TrackPlayer.setupPlayer({
        contentType: "music",
        handleAudioBecomingNoisy: true,
        android: {
          wakeMode: "network",
        },
      });

      TrackPlayer.setCommands({
        capabilities: [
          PlayerCommand.PlayPause,
          PlayerCommand.Next,
          PlayerCommand.Previous,
          PlayerCommand.Seek,
        ],
        handling: "native",
      });
    } catch (error) {
      console.warn("Audio player setup notice:", error);
    } finally {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return <ReadyPlayerProvider>{children}</ReadyPlayerProvider>;
}

function ReadyPlayerProvider({ children }: React.PropsWithChildren) {
  const [current, setCurrent] = useState<Song>();
  const [queue, setQueue] = useState<Song[]>([]);
  const activeMediaItem = useActiveMediaItem();

  useEffect(() => {
    const id = activeMediaItem?.mediaId;
    if (!id) return;

    const activeSong = queue.find((song) => song.id === id);
    if (activeSong) setCurrent(activeSong);
  }, [activeMediaItem?.mediaId, queue]);

  const playSong = async (song: Song, list: Song[] = [song]) => {
    if (!song.audioUrl) {
      Alert.alert(
        "Audio source required",
        "This song does not include a playable preview URL. Try another result."
      );
      return false;
    }
    const playable = list.filter((x) => x.audioUrl);
    const index = playable.findIndex((x) => x.id === song.id);

    TrackPlayer.setMediaItems(
      playable.map((x) => ({
        mediaId: x.id,
        url: x.audioUrl!,
        title: x.title,
        artist: x.artist,
        artworkUrl: x.artwork,
      })),
      Math.max(index, 0)
    );

    setQueue(playable);
    setCurrent(song);
    TrackPlayer.play();
    return true;
  };
  return (
    <Context.Provider
      value={useMemo(() => ({ current, queue, playSong }), [current, queue])}
    >
      {children}
    </Context.Provider>
  );
}
export const usePlayer = () => {
  const value = useContext(Context);
  if (!value) throw new Error("PlayerProvider missing");
  return value;
};
