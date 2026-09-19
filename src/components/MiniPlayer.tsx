/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Pause, Play, SkipForward } from "lucide-react-native";
import TrackPlayer, { useIsPlaying } from "@rntp/player";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "../store/PlayerContext";
import { colors, radius, spacing } from "../theme";
export function MiniPlayer() {
  const { current } = usePlayer();
  const playing = useIsPlaying();
  const nav = useNavigation<any>();
  if (!current) return null;
  return (
    <Pressable style={s.wrap} onPress={() => nav.navigate("Player")}>
      <Image source={{ uri: current.artwork }} style={s.image} />
      <View style={s.copy}>
        <Text numberOfLines={1} style={s.title}>
          {current.title}
        </Text>
        <Text numberOfLines={1} style={s.artist}>
          {current.artist}
        </Text>
      </View>
      <Pressable
        onPress={() => (playing ? TrackPlayer.pause() : TrackPlayer.play())}
      >
        {playing ? (
          <Pause color={colors.text} />
        ) : (
          <Play color={colors.text} fill={colors.text} />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          try {
            TrackPlayer.skipToNext();
          } catch {
            // Already at the end of the queue.
          }
        }}
      >
        <SkipForward color={colors.text} />
      </Pressable>
    </Pressable>
  );
}
const s = StyleSheet.create({
  wrap: {
    height: 68,
    marginHorizontal: 10,
    marginBottom: 2,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    gap: 14,
  },
  image: { width: 52, height: 52, borderRadius: 10 },
  copy: { flex: 1 },
  title: { color: colors.text, fontSize: 13, fontWeight: "700" },
  artist: { color: colors.muted, fontSize: 11, marginTop: 3 },
});
