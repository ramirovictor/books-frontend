import { describe, it, expect } from 'vitest';
import { formatPrice, parsePrice, isValidPrice } from './formatPrice';

describe('formatPrice', () => {
  it('should format positive numbers correctly', () => {
    expect(formatPrice(120)).toBe('R$ 120.00');
    expect(formatPrice(150.5)).toBe('R$ 150.50');
    expect(formatPrice(99.99)).toBe('R$ 99.99');
  });

  it('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('R$ 0.00');
  });

  it('should handle decimal precision', () => {
    expect(formatPrice(123.456)).toBe('R$ 123.46');
    expect(formatPrice(10.1)).toBe('R$ 10.10');
  });

  it('should handle invalid inputs', () => {
    expect(formatPrice(NaN)).toBe('R$ 0.00');
    expect(formatPrice(Infinity)).toBe('R$ 0.00');
  });

  it('should format negative numbers', () => {
    expect(formatPrice(-50)).toBe('R$ -50.00');
  });
});

describe('parsePrice', () => {
  it('should parse formatted prices correctly', () => {
    expect(parsePrice('R$ 120.00')).toBe(120);
    expect(parsePrice('R$ 150.50')).toBe(150.50);
    expect(parsePrice('R$ 99.99')).toBe(99.99);
  });

  it('should handle strings without currency symbol', () => {
    expect(parsePrice('120.00')).toBe(120);
    expect(parsePrice('99.99')).toBe(99.99);
  });

  it('should handle comma as decimal separator', () => {
    expect(parsePrice('R$ 120,50')).toBe(120.50);
    expect(parsePrice('99,99')).toBe(99.99);
  });

  it('should return 0 for invalid strings', () => {
    expect(parsePrice('invalid')).toBe(0);
    expect(parsePrice('')).toBe(0);
    expect(parsePrice('abc')).toBe(0);
  });

  it('should handle strings with extra characters', () => {
    expect(parsePrice('R$ 120.00 BRL')).toBe(120);
    expect(parsePrice('Price: 99.99')).toBe(99.99);
  });
});

describe('isValidPrice', () => {
  it('should return true for valid positive numbers', () => {
    expect(isValidPrice(0)).toBe(true);
    expect(isValidPrice(100)).toBe(true);
    expect(isValidPrice(99.99)).toBe(true);
  });

  it('should return false for negative numbers', () => {
    expect(isValidPrice(-1)).toBe(false);
    expect(isValidPrice(-100)).toBe(false);
  });

  it('should return false for invalid values', () => {
    expect(isValidPrice(NaN)).toBe(false);
    expect(isValidPrice(Infinity)).toBe(false);
    expect(isValidPrice(-Infinity)).toBe(false);
  });
});
