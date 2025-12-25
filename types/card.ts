export interface Card {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  image: string;
  rating: number;
}

export type SwipeDirection = 'left' | 'right' | null;
