# By Ahmed Baghni - 20230040030

# Tinder Card Swipe App - React Native Animation

A modern Tinder-like card swipe application built with React Native, Expo, and smooth animations using **react-native-reanimated** and **react-native-gesture-handler**.

## Features

- **Card Stack Layout**: Display multiple cards in an elegant stack with depth perception
- **Smooth Swipe Gestures**: Intuitive left and right swipe interactions with haptic feedback
- **Animated Transitions**: Fluid animations for card removal and replacement
- **Like/Dislike Indicators**: Visual feedback showing the swipe direction (green for like, red for dislike)
- **Responsive Design**: Optimized for mobile devices with proper safe area handling
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Performance Optimized**: Uses Reanimated 4 for 60fps smooth animations

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native 0.81** | Cross-platform mobile framework |
| **Expo 54** | Development platform and build service |
| **react-native-reanimated 4** | High-performance gesture animations |
| **react-native-gesture-handler 2.28** | Gesture detection and handling |
| **NativeWind 4** | Tailwind CSS for React Native |
| **TypeScript 5.9** | Type-safe development |

## Project Structure

```
app/
  (tabs)/
    index.tsx          ← Main home screen with card stack
    _layout.tsx        ← Tab navigation setup
components/
  card-stack.tsx       ← Card stack component with swipe logic
  screen-container.tsx ← Safe area wrapper
  ui/
    icon-symbol.tsx    ← Icon mapping
data/
  cards.ts             ← Sample card data
types/
  card.ts              ← TypeScript types for cards
  __tests__/
    card.test.ts       ← Unit tests
assets/images/
  icon.png             ← App icon
  splash-icon.png      ← Splash screen icon
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and **pnpm** (or npm/yarn)
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (macOS) or **Android Emulator** (any OS)
- **Expo Go** app on physical device (for testing on device)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/deni-stwn/RN-EXPO-ANIMATION.git
   cd RN-EXPO-ANIMATION
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

   This will start both the Metro bundler and the backend server.

### Running on Devices

#### iOS Simulator
```bash
pnpm ios
```

#### Android Emulator
```bash
pnpm android
```

#### Physical Device
1. Start the dev server: `pnpm dev`
2. Scan the QR code with Expo Go app
3. Or run: `pnpm qr` to generate a QR code

## How to Use

### Swiping Cards

- **Swipe Right**: Like the profile (green indicator)
- **Swipe Left**: Dislike the profile (red indicator)
- **Incomplete Swipe**: Card returns to original position

### Tracking Interactions

The app displays counters at the top showing:
- **Passed**: Number of disliked profiles (left swipes)
- **Liked**: Number of liked profiles (right swipes)

### End of Stack

When all cards are swiped, a message appears: "No more cards! Check back later for more!"

## Animation Details

### Card Animations

| Animation | Trigger | Effect |
|-----------|---------|--------|
| **Swipe Out** | Swipe past threshold | Card moves off-screen with rotation |
| **Card Replacement** | After swipe completes | Next card slides up with scale animation |
| **Indicator Fade** | During swipe | Like/Dislike text fades in based on direction |
| **Stack Depth** | Continuous | Cards below scale and translate for depth effect |

### Gesture Thresholds

- **Swipe Threshold**: 30% of screen width
- **Minimum Velocity**: Not enforced (position-based detection)
- **Animation Duration**: 400ms for card exit, 300ms for opacity fade

### Haptic Feedback

- **Right Swipe (Like)**: Success haptic
- **Left Swipe (Dislike)**: Warning haptic

## Customization

### Adding More Cards

Edit `data/cards.ts` and add new card objects:

```typescript
export const SAMPLE_CARDS: Card[] = [
  {
    id: '7',
    name: 'Your Name',
    age: 25,
    location: 'City, State',
    bio: 'Your bio here',
    image: 'https://your-image-url.jpg',
    rating: 4.5,
  },
  // ... more cards
];
```

### Changing Colors

Edit `theme.config.js` to customize the color palette:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  success: { light: '#22C55E', dark: '#4ADE80' },
  error: { light: '#EF4444', dark: '#F87171' },
  // ... other colors
};
```

### Adjusting Animation Speed

In `components/card-stack.tsx`, modify the animation durations:

```typescript
// Change animation duration (in milliseconds)
translateX.value = withTiming(
  direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5,
  { duration: 400 }  // ← Adjust this value
);
```

## Testing

### Run Unit Tests

```bash
pnpm test
```

Tests validate:
- Card data structure and types
- Sample card data integrity
- Swipe direction types

### Manual Testing Checklist

- [ ] Swipe right on a card (should show green "LIKE")
- [ ] Swipe left on a card (should show red "NOPE")
- [ ] Incomplete swipe (card should return to center)
- [ ] Rapid swipes (should handle gracefully)
- [ ] All 6 cards swipe through
- [ ] "No more cards" message appears at the end
- [ ] Like/Dislike counters update correctly
- [ ] Test on both iOS and Android
- [ ] Test on physical device
- [ ] Verify haptic feedback works

## Performance Optimization

### What Makes It Fast

1. **Reanimated Worklets**: All animations run on the native thread
2. **Gesture Handler**: Optimized gesture detection
3. **Memoization**: Components properly memoized to prevent unnecessary re-renders
4. **Image Optimization**: External images loaded efficiently

### Performance Tips

- Keep card images under 500KB
- Limit to 50-100 cards in production (use pagination)
- Use `FlatList` for large card lists instead of rendering all at once
- Monitor frame rate in dev tools

## Building for Production

### iOS Build
```bash
eas build --platform ios
```

### Android Build
```bash
eas build --platform android
```

### Web Build (Experimental)
```bash
pnpm build
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cards not swiping | Ensure `GestureHandlerRootView` wraps the app in `app/_layout.tsx` |
| Animations stuttering | Check if images are loading slowly; reduce image size |
| Haptic feedback not working | Verify device supports haptics; test on physical device |
| Build errors | Run `pnpm install` and `pnpm check` to validate setup |
| Metro bundler crashes | Clear cache: `expo start -c` |

## API Reference

### CardStack Component

```typescript
interface CardStackProps {
  cards: Card[];
  onSwipe: (direction: SwipeDirection) => void;
}

type SwipeDirection = 'left' | 'right' | null;

interface Card {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  image: string;
  rating: number;
}
```

### Usage Example

```tsx
import { CardStack } from '@/components/card-stack';
import { SAMPLE_CARDS } from '@/data/cards';

export default function HomeScreen() {
  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
  };

  return (
    <CardStack cards={SAMPLE_CARDS} onSwipe={handleSwipe} />
  );
}
```
