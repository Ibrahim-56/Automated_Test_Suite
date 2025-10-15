export function getRandomItems<T>(items: T[]): T[] {
  const shuffled = items.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
