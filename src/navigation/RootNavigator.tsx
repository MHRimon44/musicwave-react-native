/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Heart, Home, Search } from "lucide-react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { PlayerScreen } from "../screens/PlayerScreen";
import { MiniPlayer } from "../components/MiniPlayer";
import { RootStackParamList, TabParamList } from "../types";
import { colors } from "../theme";
const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
function Tabs() {
  return (
    <View style={styles.fill}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 64,
            paddingTop: 7,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            paddingBottom: 7,
          },
          tabBarIcon: ({ color, size }) =>
            route.name === "Home" ? (
              <Home color={color} size={size} />
            ) : route.name === "Search" ? (
              <Search color={color} size={size} />
            ) : (
              <Heart color={color} size={size} />
            ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
      <View style={styles.mini}>
        <MiniPlayer />
      </View>
    </View>
  );
}
export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  fill: { flex: 1 },
  mini: { position: "absolute", left: 0, right: 0, bottom: 64 },
});
