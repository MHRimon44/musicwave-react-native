import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Heart, Play } from "lucide-react-native";
import { Song } from "../types";
import { colors, radius, spacing } from "../theme";
import { useFavorites } from "../store/FavoritesContext";
import { usePlayer } from "../store/PlayerContext";
export function SongRow({ song, queue }: { song: Song; queue: Song[] }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { playSong } = usePlayer();
  const liked = isFavorite(song.id);
  return (
    <Pressable style={s.row} onPress={() => playSong(song, queue)}>
      <Image source={{ uri: song.artwork }} style={s.image} />
      <View style={s.copy}>
        <Text numberOfLines={1} style={s.title}>
          {song.title}
        </Text>
        <Text numberOfLines={1} style={s.artist}>
          {song.artist}
        </Text>
      </View>
      <Pressable hitSlop={10} onPress={() => toggleFavorite(song)}>
        <Heart
          size={20}
          color={liked ? colors.primary : colors.muted}
          fill={liked ? colors.primary : "transparent"}
        />
      </Pressable>
      <View style={s.play}>
        <Play size={16} color={colors.white} fill={colors.white} />
      </View>
    </Pressable>
  );
}
const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    gap: 12,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: radius.sm,
    backgroundColor: colors.surface2,
  },
  copy: { flex: 1 },
  title: { color: colors.text, fontSize: 14, fontWeight: "700" },
  artist: { color: colors.muted, fontSize: 12, marginTop: 5 },
  play: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
});
