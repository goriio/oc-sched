export function isUrl(url) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}
