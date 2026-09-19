/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Music2, Sparkles } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SongCard } from "../components/SongCard";
import { SongRow } from "../components/SongRow";
import { SectionHeader } from "../components/SectionHeader";
import { getNewMusic, getPopularMusic } from "../services/itunes";
import { Song } from "../types";
import { colors, spacing } from "../theme";
export function HomeScreen() {
  const [popular, setPopular] = useState<Song[]>([]);
  const [latest, setLatest] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [p, n] = await Promise.all([getPopularMusic(), getNewMusic()]);
      setPopular(p);
      setLatest(n);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load music");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={load}
            tintColor={colors.primary}
          />
        }
      >
        <View style={s.header}>
          <View>
            <Text style={s.eyebrow}>GOOD VIBES ONLY</Text>
            <Text style={s.logo}>
              Music<Text style={s.mark}>Wave</Text>
            </Text>
          </View>
          <View style={s.avatar}>
            <Music2 color={colors.white} size={21} />
          </View>
        </View>
        <View style={s.hero}>
          <Sparkles color={colors.primary} />
          <Text style={s.heroTitle}>Soundtrack your moment</Text>
          <Text style={s.heroCopy}>
            Discover popular tracks and playable music previews.
          </Text>
        </View>
        {error ? <Text style={s.error}>{error}</Text> : null}
        {loading && !popular.length ? (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            <SectionHeader
              title="Trending now"
              caption="Most played around you"
            />
            <FlatList
              horizontal
              data={popular}
              keyExtractor={(x) => x.id}
              renderItem={({ item }) => (
                <SongCard song={item} queue={popular} />
              )}
              contentContainerStyle={{ paddingLeft: spacing.md }}
              showsHorizontalScrollIndicator={false}
            />
            <SectionHeader
              title="Fresh releases"
              caption="New music worth discovering"
            />
            {latest.map((x) => (
              <SongRow key={x.id} song={x} queue={latest} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eyebrow: {
    fontSize: 10,
    color: colors.muted,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  logo: { fontSize: 28, color: colors.text, fontWeight: "900" },
  mark: { color: colors.primary },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  hero: {
    margin: spacing.md,
    marginTop: 24,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#20142A",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.text,
    marginTop: 12,
  },
  heroCopy: {
    fontSize: 13,
    lineHeight: 19,
    color: "#B9AEC0",
    marginTop: 7,
    maxWidth: 280,
  },
  error: { color: colors.primary, margin: spacing.md },
});
