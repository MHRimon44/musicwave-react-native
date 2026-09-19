export type Song = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  duration?: number;
  audioUrl?: string;
  youtubeVideoId?: string;
};
export type RootStackParamList = { Tabs: undefined; Player: undefined };
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};
