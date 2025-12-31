export function calculateAccuracy(input, text) {
  if (!input.length) return 100;
  let correct = 0;

  input.split("").forEach((char, i) => {
    if (char === text[i]) correct++;
  });

  return Math.round((correct / input.length) * 100);
}
