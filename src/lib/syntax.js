// Pemetaan nama kelas lengkap (bukan class dinamis) agar Tailwind tetap mendeteksi.
export const TOKEN_CLASS = {
  key: 'text-syn-key',
  str: 'text-syn-str',
  num: 'text-syn-num',
  fn: 'text-syn-fn',
  dim: 'text-syn-dim',
  pun: 'text-muted',
  acc: 'text-accent',
  ok: 'text-syn-str',
  cmd: 'text-text',
  out: 'text-muted',
  text: 'text-text',
  muted: 'text-muted',
}

export const seg = (k, v, cls) => ({ k, v, cls })

export const codeLine = (segs = [], meta = {}) => ({ segs, ...meta })

const JSON_KEY = /^(\s*)("(?:[^"\\]|\\.)*")(\s*:)(.*)$/
const JSON_STR = /^(\s*)("(?:[^"\\]|\\.)*")(.*)$/
const JSON_LIT = /^(\s*)(-?\d+(?:\.\d+)?|true|false|null)(.*)$/

// Tokenisasi JSON per baris supaya nomor baris di gutter tetap sinkron dengan isi.
export function jsonToLines(text) {
  return text.split('\n').map((raw) => codeLine(tokenizeJsonLine(raw)))
}

function tokenizeJsonLine(raw) {
  let match = raw.match(JSON_KEY)
  if (match) {
    return [seg('pun', match[1]), seg('key', match[2]), seg('pun', match[3]), ...tail(match[4])]
  }
  match = raw.match(JSON_STR)
  if (match) {
    return [seg('pun', match[1]), seg('str', match[2]), seg('pun', match[3])]
  }
  match = raw.match(JSON_LIT)
  if (match) {
    return [seg('pun', match[1]), seg('num', match[2]), seg('pun', match[3])]
  }
  return [seg('pun', raw)]
}

function tail(rest) {
  const trimmed = rest.trimStart()
  if (!trimmed) return rest ? [seg('pun', rest)] : []
  return [seg('pun', rest.slice(0, rest.length - trimmed.length)), seg('str', trimmed)]
}
