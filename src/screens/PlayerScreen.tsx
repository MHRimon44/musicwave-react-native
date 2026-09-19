/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import {
  ChevronDown,
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react-native";
import TrackPlayer, { useIsPlaying, useProgress } from "@rntp/player";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "../store/PlayerContext";
import { useFavorites } from "../store/FavoritesContext";
import { colors, spacing } from "../theme";
const time = (value: number) =>
  `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(
    2,
    "0"
  )}`;
export function PlayerScreen() {
  const nav = useNavigation();
  const { current } = usePlayer();
  const { toggleFavorite, isFavorite } = useFavorites();
  const playing = useIsPlaying();
  const progress = useProgress(0.5);
  if (!current) return null;
  const liked = isFavorite(current.id);
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Pressable onPress={() => nav.goBack()}>
          <ChevronDown color={colors.text} />
        </Pressable>
        <Text style={s.now}>NOW PLAYING</Text>
        <View style={{ width: 24 }} />
      </View>
      <Image source={{ uri: current.artwork }} style={s.art} />
      <View style={s.info}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={s.title}>
            {current.title}
          </Text>
          <Text style={s.artist}>{current.artist}</Text>
        </View>
        <Pressable onPress={() => toggleFavorite(current)}>
          <Heart
            size={26}
            color={liked ? colors.primary : colors.muted}
            fill={liked ? colors.primary : "transparent"}
          />
        </Pressable>
      </View>
      <Slider
        minimumValue={0}
        maximumValue={progress.duration || 1}
        value={progress.position}
        onSlidingComplete={TrackPlayer.seekTo}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.surface2}
        thumbTintColor={colors.primary}
      />
      <View style={s.times}>
        <Text style={s.time}>{time(progress.position)}</Text>
        <Text style={s.time}>{time(progress.duration)}</Text>
      </View>
      <View style={s.controls}>
        <Pressable
          onPress={() => {
            try {
              TrackPlayer.skipToPrevious();
            } catch {
              // Already at the beginning of the queue.
            }
          }}
        >
          <SkipBack size={31} color={colors.text} fill={colors.text} />
        </Pressable>
        <Pressable
          style={s.main}
          onPress={() => (playing ? TrackPlayer.pause() : TrackPlayer.play())}
        >
          {playing ? (
            <Pause size={34} color={colors.white} fill={colors.white} />
          ) : (
            <Play size={34} color={colors.white} fill={colors.white} />
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
          <SkipForward size={31} color={colors.text} fill={colors.text} />
        </Pressable>
      </View>
      <View style={s.volume}>
        <Volume2 size={19} color={colors.muted} />
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={1}
          onValueChange={TrackPlayer.setVolume}
          minimumTrackTintColor={colors.muted}
          maximumTrackTintColor={colors.surface2}
          thumbTintColor={colors.text}
        />
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
  },
  now: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
  },
  art: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 28,
    marginTop: 18,
    backgroundColor: colors.surface2,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 28,
    marginBottom: 18,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: "900" },
  artist: { color: colors.muted, fontSize: 14, marginTop: 6 },
  times: { flexDirection: "row", justifyContent: "space-between" },
  time: { color: colors.muted, fontSize: 11 },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 44,
    marginTop: 22,
  },
  main: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  volume: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 34 },
});
