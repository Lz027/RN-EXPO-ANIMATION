import React, { useState, useCallback } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { Card, SwipeDirection } from '@/types/card';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = CARD_WIDTH * 1.3;

interface CardStackProps {
  cards: Card[];
  onSwipe: (direction: SwipeDirection) => void;
}

export function CardStack({ cards, onSwipe }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];
  const nextNextCard = cards[currentIndex + 2];

  const resetCard = useCallback(() => {
    translateX.value = withSpring(0, { damping: 10, mass: 1 });
    translateY.value = withSpring(0, { damping: 10, mass: 1 });
    rotate.value = withSpring(0, { damping: 10, mass: 1 });
    opacity.value = withSpring(1, { damping: 10, mass: 1 });
  }, [translateX, translateY, rotate, opacity]);

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (direction === 'left') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else if (direction === 'right') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }

      // Animate card out
      translateX.value = withTiming(
        direction === 'left' ? -screenWidth * 1.5 : screenWidth * 1.5,
        { duration: 400 }
      );
      rotate.value = withTiming(direction === 'left' ? -45 : 45, { duration: 400 });
      opacity.value = withTiming(0, { duration: 300 });

      // Move to next card
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        resetCard();
        onSwipe(direction);
      }, 300);
    },
    [translateX, rotate, opacity, resetCard, onSwipe]
  );

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.1;
      rotate.value = interpolate(
        e.translationX,
        [-screenWidth, 0, screenWidth],
        [-30, 0, 30],
        Extrapolate.CLAMP
      );
    })
    .onEnd((e) => {
      const threshold = screenWidth * 0.3;

      if (e.translationX > threshold) {
        handleSwipe('right');
      } else if (e.translationX < -threshold) {
        handleSwipe('left');
      } else {
        resetCard();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-screenWidth, 0, screenWidth],
          [0.95, 1, 0.95],
          Extrapolate.CLAMP
        ),
      },
      {
        translateY: interpolate(
          Math.abs(translateX.value),
          [0, screenWidth * 0.3],
          [0, -20],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const nextNextCardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-screenWidth, 0, screenWidth],
          [0.9, 0.95, 0.9],
          Extrapolate.CLAMP
        ),
      },
      {
        translateY: interpolate(
          Math.abs(translateX.value),
          [0, screenWidth * 0.3],
          [0, -40],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  if (!currentCard) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-foreground mb-4">No more cards!</Text>
        <Text className="text-muted text-center px-6">
          You've swiped through all available profiles. Check back later for more!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      {/* Stack Background */}
      <View className="absolute inset-0 pointer-events-none">
        {/* Third card */}
        {nextNextCard && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                left: (screenWidth - CARD_WIDTH) / 2,
                top: (Dimensions.get('window').height - CARD_HEIGHT) / 2,
              },
              nextNextCardStyle,
            ]}
          >
            <CardView card={nextNextCard} />
          </Animated.View>
        )}

        {/* Second card */}
        {nextCard && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                left: (screenWidth - CARD_WIDTH) / 2,
                top: (Dimensions.get('window').height - CARD_HEIGHT) / 2,
              },
              nextCardStyle,
            ]}
          >
            <CardView card={nextCard} />
          </Animated.View>
        )}
      </View>

      {/* Top card with gesture */}
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              position: 'absolute',
            },
            animatedStyle,
          ]}
        >
          <CardView card={currentCard} />

          {/* Like/Dislike Indicators */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 20,
                right: 20,
                opacity: interpolate(
                  translateX.value,
                  [0, screenWidth * 0.3],
                  [0, 1],
                  Extrapolate.CLAMP
                ),
              },
            ]}
          >
            <View className="bg-green-500 px-4 py-2 rounded-full">
              <Text className="text-white font-bold text-lg">LIKE</Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 20,
                left: 20,
                opacity: interpolate(
                  translateX.value,
                  [0, -screenWidth * 0.3],
                  [0, 1],
                  Extrapolate.CLAMP
                ),
              },
            ]}
          >
            <View className="bg-red-500 px-4 py-2 rounded-full">
              <Text className="text-white font-bold text-lg">NOPE</Text>
            </View>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

interface CardViewProps {
  card: Card;
}

function CardView({ card }: CardViewProps) {
  return (
    <View className="flex-1 rounded-2xl overflow-hidden bg-surface shadow-lg">
      {/* Image */}
      <Image
        source={{ uri: card.image }}
        style={{ width: '100%', height: '70%' }}
        resizeMode="cover"
      />

      {/* Info Section */}
      <View className="flex-1 p-4 justify-between bg-surface">
        <View>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-2xl font-bold text-foreground">
              {card.name}, {card.age}
            </Text>
            <View className="flex-row items-center bg-yellow-400 px-2 py-1 rounded-full">
              <Text className="text-sm font-semibold">⭐ {card.rating}</Text>
            </View>
          </View>
          <Text className="text-sm text-muted mb-2">📍 {card.location}</Text>
          <Text className="text-xs text-muted leading-relaxed line-clamp-2">{card.bio}</Text>
        </View>
      </View>
    </View>
  );
}
