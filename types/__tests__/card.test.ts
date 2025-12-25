import { describe, it, expect } from 'vitest';
import { Card, SwipeDirection } from '../card';
import { SAMPLE_CARDS } from '@/data/cards';

describe('Card Types', () => {
  it('should have valid card structure', () => {
    const card: Card = {
      id: '1',
      name: 'Test User',
      age: 25,
      location: 'Test City',
      bio: 'Test bio',
      image: 'https://example.com/image.jpg',
      rating: 4.5,
    };

    expect(card.id).toBe('1');
    expect(card.name).toBe('Test User');
    expect(card.age).toBe(25);
    expect(card.rating).toBe(4.5);
  });

  it('should support swipe directions', () => {
    const directions: SwipeDirection[] = ['left', 'right', null];
    
    directions.forEach((direction) => {
      expect(['left', 'right', null]).toContain(direction);
    });
  });

  it('should load sample cards correctly', () => {
    expect(SAMPLE_CARDS.length).toBeGreaterThanOrEqual(3);
    expect(SAMPLE_CARDS[0].name).toBe('Sarah');
    expect(SAMPLE_CARDS[0].age).toBe(28);
  });

  it('should have valid card data in sample cards', () => {
    SAMPLE_CARDS.forEach((card) => {
      expect(card.id).toBeTruthy();
      expect(card.name).toBeTruthy();
      expect(card.age).toBeGreaterThan(0);
      expect(card.location).toBeTruthy();
      expect(card.bio).toBeTruthy();
      expect(card.image).toBeTruthy();
      expect(card.rating).toBeGreaterThan(0);
      expect(card.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should have at least 6 sample cards', () => {
    expect(SAMPLE_CARDS.length).toBe(6);
  });
});
