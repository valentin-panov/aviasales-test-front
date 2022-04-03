import { declOfNum } from './declOfNum'

export const declOfSwitches = (count: number): string => {
  return `${count} ${declOfNum(count, ['пересадка', 'пересадки', 'пересадок'])}`
}
