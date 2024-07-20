/**
 * Formats a price based on its magnitude.
 * - Prices >= 1000 will have 2 decimal places.
 * - Prices >= 0.01 will have 4 decimal places.
 * - Prices < 0.01 will be shown in scientific notation.
 *
 * @param price The price to format.
 * @returns The formatted price as a string.
 */
export const formatPrice = (price: number | string | undefined): string => {
  if (price === undefined) {
    return '0';
  }

  // Convert price to a number if it's a string
  const num = typeof price === 'number' ? price : parseFloat(String(price));

  if (isNaN(num)) {
    return '0';
  }

  if (num >= 1000) {
    return num.toFixed(2); // Show 2 decimal places for prices 1000 and above
  } else if (num >= 0.01) {
    return num.toFixed(4); // Show 4 decimal places for prices between 0.01 and 1000
  } else {
    return num.toPrecision(4); // Use scientific notation for very small prices
  }
};
