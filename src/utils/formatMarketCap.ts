/**
 * Formats a market cap number into a human-readable string with units like "K", "M", "B", or "T".
 *
 * @param value The market cap value to format.
 * @returns A string representing the formatted market cap.
 */
export const formatMarketCap = (value: number): string => {
  if (value >= 1_000_000_000_000) {
    return `${(value / 1_000_000_000_000).toFixed(1)} trillion`;
  } else if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} billion`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} million`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} thousand`;
  } else {
    return value.toFixed(2);
  }
};
