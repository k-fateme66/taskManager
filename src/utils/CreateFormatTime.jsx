export function CreateFormatTime(date) {
  return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
}
