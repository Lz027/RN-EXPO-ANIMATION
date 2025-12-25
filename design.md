# Tinder Card Swipe App - Design Document

## Overview
A Tinder-like card swipe application with smooth animations using React Native Reanimated and Gesture Handler. Users can swipe cards left or right with different behaviors for each direction.

## Screen List

1. **Home Screen** - Card Stack Display
   - Displays a stack of cards (minimum 3 visible)
   - Top card is interactive and can be swiped
   - Cards below are visible but not interactive
   - Shows action feedback (like/dislike indicators)

## Primary Content and Functionality

### Home Screen
- **Card Stack**: Display cards in a stack layout with the top card being interactive
- **Card Content**: Each card displays:
  - Profile image/avatar
  - Name and description
  - Rating or other metadata
- **Swipe Gestures**:
  - **Left Swipe**: Reject/Dislike action (red indicator, card moves left and fades out)
  - **Right Swipe**: Accept/Like action (green indicator, card moves right and fades out)
- **Animation Feedback**:
  - Smooth card rotation during swipe
  - Scale animation for depth perception
  - Opacity fade as card exits
  - Next card slides up smoothly after current card is removed
- **Card Replacement**: When a card is swiped away, the next card in the stack moves up with animation

## Key User Flows

1. **View Cards**
   - User opens app → Home screen loads with card stack
   - 3+ cards are visible in stack layout
   - Top card is ready for interaction

2. **Swipe Right (Like)**
   - User swipes card to the right
   - Card shows green "Like" indicator
   - Card animates: moves right, rotates, fades out
   - Next card slides up to top position
   - Action is recorded (optional: stored locally)

3. **Swipe Left (Dislike)**
   - User swipes card to the left
   - Card shows red "Dislike" indicator
   - Card animates: moves left, rotates, fades out
   - Next card slides up to top position
   - Action is recorded (optional: stored locally)

4. **End of Stack**
   - When all cards are swiped, show "No more cards" message
   - Option to reset/reload cards

## Color Choices

- **Primary Brand**: `#0a7ea4` (Teal/Blue) - Used for accents and UI elements
- **Like Color**: `#22C55E` (Green) - Indicates positive/like action
- **Dislike Color**: `#EF4444` (Red) - Indicates negative/dislike action
- **Background**: `#ffffff` (Light) / `#151718` (Dark)
- **Card Surface**: `#f5f5f5` (Light) / `#1e2022` (Dark)
- **Text Primary**: `#11181C` (Light) / `#ECEDEE` (Dark)
- **Text Secondary**: `#687076` (Light) / `#9BA1A6` (Dark)

## Technical Implementation Details

### Animation Libraries
- **react-native-reanimated**: For smooth, performant animations
- **react-native-gesture-handler**: For gesture detection (pan/swipe)

### Card Stack Architecture
- Use `FlatList` or custom stack component to manage card data
- Implement gesture responder on top card only
- Track card index and animate removal/replacement
- Use `Animated.View` for transform animations

### Gesture Handling
- Pan gesture detector on top card
- Threshold-based swipe detection (left/right)
- Haptic feedback on swipe completion
- Spring animation for card return if swipe incomplete

### State Management
- Local state for card stack (array of card objects)
- Track current card index
- Store swipe history (optional: AsyncStorage)

## Responsive Design
- Portrait orientation (9:16 aspect ratio)
- One-handed usage - all interactive elements in reachable zone
- Card size: ~90% of screen width, centered
- Safe area handling for notch/home indicator
