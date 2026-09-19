import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Song } from "../types";
const KEY = "@musicwave/favorites";
type Value = {
  favorites: Song[];
  toggleFavorite: (song: Song) => void;
  isFavorite: (id: string) => boolean;
};
const Context = createContext<Value | null>(null);
export function FavoritesProvider({ children }: React.PropsWithChildren) {
  const [favorites, setFavorites] = useState<Song[]>([]);
  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => v && setFavorites(JSON.parse(v)))
      .catch(() => undefined);
  }, []);
  const toggleFavorite = useCallback(
    (song: Song) =>
      setFavorites((current) => {
        const next = current.some((x) => x.id === song.id)
          ? current.filter((x) => x.id !== song.id)
          : [song, ...current];
        AsyncStorage.setItem(KEY, JSON.stringify(next));
        return next;
      }),
    []
  );
  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (id: string) => favorites.some((x) => x.id === id),
    }),
    [favorites, toggleFavorite]
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useFavorites = () => {
  const value = useContext(Context);
  if (!value) throw new Error("FavoritesProvider missing");
  return value;
};
