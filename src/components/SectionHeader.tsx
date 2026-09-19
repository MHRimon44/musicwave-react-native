import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "../theme";
export const SectionHeader = ({
  title,
  caption,
}: {
  title: string;
  caption?: string;
}) => (
  <View style={s.row}>
    <View>
      <Text style={s.title}>{title}</Text>
      {caption ? <Text style={s.caption}>{caption}</Text> : null}
    </View>
  </View>
);
const s = StyleSheet.create({
  row: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { color: colors.text, fontSize: 22, fontWeight: "800" },
  caption: { color: colors.muted, fontSize: 12, marginTop: 3 },
});
