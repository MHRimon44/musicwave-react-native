/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Search, X } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchMusic } from "../services/itunes";
import { Song } from "../types";
import { SongRow } from "../components/SongRow";
import { colors, radius, spacing } from "../theme";
export function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        setResults(await searchMusic(query.trim()));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Search failed");
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);
  return (
    <SafeAreaView style={s.safe} edges={["top", "bottom"]}>
      <Text style={s.heading}>Search</Text>
      <View style={s.search}>
        <Search color={colors.muted} size={20} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Songs, artists or albums"
          placeholderTextColor={colors.muted}
          style={s.input}
          returnKeyType="search"
          onSubmitEditing={Keyboard.dismiss}
        />
        {query ? (
          <Pressable onPress={() => setQuery("")}>
            <X color={colors.muted} size={20} />
          </Pressable>
        ) : null}
      </View>
      {loading ? (
        <ActivityIndicator color={colors.primary} style={{ marginTop: 30 }} />
      ) : null}
      {error ? <Text style={s.error}>{error}</Text> : null}
      {!query && !loading ? (
        <View style={s.empty}>
          <Search color={colors.surface2} size={76} />
          <Text style={s.emptyTitle}>Find your next favourite</Text>
          <Text style={s.emptyCopy}>
            Search songs or artists and play free music previews.
          </Text>
        </View>
      ) : null}
      <FlatList
        data={results}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => <SongRow song={item} queue={results} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  heading: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    margin: spacing.md,
  },
  search: {
    height: 52,
    marginHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
  },
  input: { flex: 1, color: colors.text, fontSize: 15 },
  error: { color: colors.primary, margin: spacing.md },
  empty: { alignItems: "center", paddingHorizontal: 36, paddingTop: 100 },
  emptyTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 20,
  },
  emptyCopy: {
    color: colors.muted,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
});
