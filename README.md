# MusicWave

MusicWave is a modern dark-mode music discovery and player app built with
React Native and TypeScript. Users can explore music, search by song or artist,
save favourites, and control playback from a compact player or the full player
screen.

> The current free data source provides legal song previews. A licensed music
> catalogue or your own audio backend is required for complete commercial songs.

## Features

- Dark, mobile-friendly music interface
- Home screen with popular music and new discoveries
- Search by song or artist
- Play, pause, next, previous, seek, and volume controls
- Favourite and unfavourite songs
- Saved favourites using local device storage
- Mini player and full-screen player
- Android and iOS support

## Technology

- React Native CLI
- TypeScript and React
- React Navigation
- `@rntp/player` for audio playback
- AsyncStorage for favourites
- iTunes Search API for searchable, playable previews
- Lucide icons and React Native SVG

## Project structure

```text
src/
├── components/   Reusable song cards, rows, and player UI
├── navigation/   App tabs and screen navigation
├── screens/      Home, Search, Favourites, and Player screens
├── services/     Music API integrations
├── store/        Player and favourites state
├── theme/        App colours and spacing
└── types/        Shared TypeScript types
```

## Getting started

Read [INSTALL.md](INSTALL.md) for complete installation and run commands.

## Music source notice

The app does not extract or download MP3 audio from YouTube. To provide full
songs, connect `audioUrl` to music that you own or are licensed to distribute,
or integrate an officially licensed streaming provider.

## Project status

MusicWave is suitable as a music-player UI demo and a foundation for a larger
licensed streaming product.
