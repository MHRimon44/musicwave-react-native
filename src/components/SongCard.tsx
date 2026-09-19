import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Heart, Play } from "lucide-react-native";
import { Song } from "../types";
import { colors, radius, spacing } from "../theme";
import { useFavorites } from "../store/FavoritesContext";
import { usePlayer } from "../store/PlayerContext";
export function SongCard({ song, queue }: { song: Song; queue: Song[] }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { playSong } = usePlayer();
  const liked = isFavorite(song.id);
  return (
    <Pressable style={s.card} onPress={() => playSong(song, queue)}>
      <Image source={{ uri: song.artwork }} style={s.image} />
      <Pressable style={s.play} onPress={() => playSong(song, queue)}>
        <Play color={colors.white} fill={colors.white} size={16} />
      </Pressable>
      <Text numberOfLines={1} style={s.title}>
        {song.title}
      </Text>
      <View style={s.meta}>
        <Text numberOfLines={1} style={s.artist}>
          {song.artist}
        </Text>
        <Pressable hitSlop={10} onPress={() => toggleFavorite(song)}>
          <Heart
            size={17}
            color={liked ? colors.primary : colors.muted}
            fill={liked ? colors.primary : "transparent"}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
const s = StyleSheet.create({
  card: { width: 168, marginRight: spacing.md },
  image: {
    height: 102,
    width: 168,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
  },
  play: {
    position: "absolute",
    right: 9,
    top: 65,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: colors.text, fontSize: 14, fontWeight: "700", marginTop: 10 },
  meta: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
  artist: { color: colors.muted, fontSize: 12, flex: 1 },
});
