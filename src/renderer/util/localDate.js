export const toLocalDate = (date) => {
  const utcDate = new Date(date)
  const localDate = utcDate.toLocaleString('en-US', {
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric'
  }) // Converts to local date
  return localDate
}
