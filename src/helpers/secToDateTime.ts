export const min2mmhh = (min: number): string => {
  const m = min % 60
  const h = (min - m) / 60
  return h.toString() + 'ч ' + (m > 0 ? m.toString() + 'м' : '')
}

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
