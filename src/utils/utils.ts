export function capitalizeFirstChar(word: string): string {
  if (word.length === 0) return word; // Return the word if it's empty
  return word.charAt(0).toUpperCase() + word.slice(1);
}
