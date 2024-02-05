export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomPrice() {
  return randomIntFromInterval(5, 25);
}

export function lowercaseFirstLetter(input: string) {
  return input.charAt(0).toLowerCase() + input.slice(1);
}
