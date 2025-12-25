import { useState } from 'react';
import { View, Text } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { CardStack } from '@/components/card-stack';
import { SAMPLE_CARDS } from '@/data/cards';
import { SwipeDirection } from '@/types/card';

export default function HomeScreen() {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const handleSwipe = (direction: SwipeDirection) => {
    if (direction === 'right') {
      setLikeCount((prev) => prev + 1);
    } else if (direction === 'left') {
      setDislikeCount((prev) => prev + 1);
    }
  };

  return (
    <ScreenContainer className="bg-background">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-3xl font-bold text-foreground">Discover</Text>
        <View className="flex-row justify-between mt-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-red-500">{dislikeCount}</Text>
            <Text className="text-xs text-muted">Passed</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-500">{likeCount}</Text>
            <Text className="text-xs text-muted">Liked</Text>
          </View>
        </View>
      </View>

      {/* Card Stack */}
      <View className="flex-1">
        <CardStack cards={SAMPLE_CARDS} onSwipe={handleSwipe} />
      </View>
    </ScreenContainer>
  );
}
