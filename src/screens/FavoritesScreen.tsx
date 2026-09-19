import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Heart } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../store/FavoritesContext";
import { SongRow } from "../components/SongRow";
import { colors, spacing } from "../theme";
export function FavoritesScreen() {
  const { favorites } = useFavorites();
  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <Text style={s.heading}>Your favourites</Text>
      <Text style={s.sub}>{favorites.length} saved songs</Text>
      <FlatList
        data={favorites}
        keyExtractor={(x) => x.id}
        renderItem={({ item }) => <SongRow song={item} queue={favorites} />}
        ListEmptyComponent={
          <View style={s.empty}>
            <Heart color={colors.surface2} size={76} />
            <Text style={s.emptyTitle}>No favourites yet</Text>
            <Text style={s.emptyCopy}>
              Tap the heart on any song to keep it here.
            </Text>
          </View>
        }
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
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sub: {
    color: colors.muted,
    fontSize: 13,
    marginHorizontal: spacing.md,
    marginTop: 4,
    marginBottom: 16,
  },
  empty: { alignItems: "center", paddingTop: 100 },
  emptyTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 20,
  },
  emptyCopy: { color: colors.muted, fontSize: 13, marginTop: 7 },
});
