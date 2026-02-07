# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reclaimer is a React Native/Expo mobile app that gamifies recycling through AI-powered scanning, real-time impact tracking, and financial incentives. Built for Hackathon 2026.

## Development Commands

```bash
# Start development server
npx expo start

# Platform-specific
npx expo start --ios
npx expo start --android
npx expo start --web

# Install dependencies
npm install
```

No test or lint scripts are configured. A sample test exists at `components/__tests__/StyledText-test.js`.

## Architecture

### File-Based Routing (Expo Router)
- `app/` - All screens and navigation
- `app/(tabs)/` - Main tab navigator: Home, Map, Scan, Wallet, Profile
- `app/_layout.tsx` - Root layout configuration

### Key Directories
- `components/` - Reusable UI components
- `constants/` - App configuration (Colors, Layout)
- `website/` - Landing page (deployed via GitHub Pages)

## Theming Pattern

**Always use themed components** instead of React Native primitives:

```typescript
import { Text, View } from '@/components/Themed';
```

These wrappers from `components/Themed.tsx` automatically handle light/dark mode based on device settings.

Access theme colors via:
```typescript
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? 'light'];
```

## Key Conventions

- **Absolute imports**: Use `@/` alias (e.g., `@/components/Themed`)
- **Icons**: Use `lucide-react-native` for consistent iconography
- **Camera overlays**: Use `StyleSheet.absoluteFill` with z-indexing for layering UI over camera feeds
- **Bottom sheets**: Custom implementations using `PanResponder` and `Animated` API
- **Animations**: `react-native-reanimated` for 60fps UI thread animations
