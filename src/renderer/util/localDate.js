export const toLocalDate = (date) => {
  const utcDate = new Date(date)
  const localDate = utcDate.toLocaleString() // Converts to local date
  return localDate
}
