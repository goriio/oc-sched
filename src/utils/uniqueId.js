export function uniqueId() {
  return Date.now().toString(16) + Math.random().toString(16).substring(2);
}
