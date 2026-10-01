import { config } from '../data/config'

export function waLink(message) {
  return `${config.waBase}?text=${encodeURIComponent(message)}`
}
