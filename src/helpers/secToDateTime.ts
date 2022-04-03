export const min2mmhh = (min: number): string =>
  `${new Date(min * 60 * 1000)
    .toISOString()
    .substring(11, 16)
    .replace(':', 'ч ')}м`

export const getBeautifulDateInTimeFromString = (raw: string) => {
  try {
    const event = new Date(raw.replace(/\s/, 'T'))
    return `${event
      .toLocaleTimeString()
      .substring(0, 5)} – ${event.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit'
    })}`
  } catch (e) {
    return ''
  }
}
