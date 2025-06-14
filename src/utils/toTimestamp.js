export function toTimestamp(dateStr) {
  // Expecting format: "DD/MM/YYYY"
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return Math.floor(date.getTime() / 1000); // Unix timestamp in seconds
}