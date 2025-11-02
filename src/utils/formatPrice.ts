/**
 * Formats a number as Brazilian Real (BRL) currency
 * @param price - The price value to format
 * @returns Formatted price string (e.g., "R$ 120.00")
 */
export function formatPrice(price: number): string {
  if (typeof price !== 'number' || isNaN(price) || !isFinite(price)) {
    return 'R$ 0.00';
  }
  return `R$ ${price.toFixed(2)}`;
}

/**
 * Parses a formatted price string to a number
 * @param priceString - Formatted price string (e.g., "R$ 120.00")
 * @returns Number value
 */
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.,]/g, '');
  const normalized = cleaned.replace(',', '.');
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validates if a price is valid (non-negative number)
 * @param price - The price to validate
 * @returns True if valid, false otherwise
 */
export function isValidPrice(price: number): boolean {
  return typeof price === 'number' && !isNaN(price) && isFinite(price) && price >= 0;
}
