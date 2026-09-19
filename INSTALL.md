# MusicWave installation guide

This guide assumes that a React Native CLI development environment is already
available. For Android, install Android Studio, an Android SDK, Java 17, Node.js
22.11 or newer, and Yarn Classic.

## 1. Create the base project

If you do not already have the MusicWave project, run:

```sh
npx @react-native-community/cli@latest init MusicWave --version 0.87.1
cd MusicWave
```

## 2. Replace the app files

Copy the supplied `src` folder and `index.js` into the project root. Replace
existing files when asked. Set the root `App.tsx` to render the navigator and
providers supplied with your MusicWave project package.

## 3. Install required packages

```sh
yarn add @rntp/player@5.7.0
yarn add @react-native-async-storage/async-storage
yarn add @react-native-community/slider
yarn add @react-navigation/native
yarn add @react-navigation/native-stack
yarn add @react-navigation/bottom-tabs
yarn add react-native-safe-area-context react-native-screens
yarn add react-native-svg lucide-react-native
```

Do not install `react-native-track-player@4`, because this source uses the newer
`@rntp/player` package.

## 4. iOS only

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## 5. Clean Android and start Metro

```sh
cd android
./gradlew clean
cd ..
yarn start --reset-cache
```

Keep Metro running. Open a second terminal in the project root and run:

```sh
yarn android
```

For iOS on macOS:

```sh
yarn ios
```

## API configuration

The active Home and Search screens use the public iTunes Search API with the US
storefront. No API key or `.env` file is required for playable previews.

## Common fixes

If Android cannot connect to Metro while using a physical USB device:

```sh
adb reverse tcp:8081 tcp:8081
```

If old JavaScript still appears, stop Metro and run:

```sh
yarn start --reset-cache
```

If you changed native packages, rebuild instead of only reloading:

```sh
cd android
./gradlew clean
cd ..
yarn android
```

## Important playback note

The free iTunes source normally returns short previews. Full popular songs need
a licensed provider or audio files that you have permission to stream. Add the
licensed URL to each song's `audioUrl` field; the existing player can then play
the complete track.
