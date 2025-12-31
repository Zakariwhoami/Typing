export function calculateWPM(input, timeLeft) {
  const timeSpent = (60 - timeLeft) / 60;
  if (timeSpent <= 0) return 0;
  return Math.round((input.length / 5) / timeSpent);
}
