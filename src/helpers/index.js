export const generateColors = (n) => {
  const colors = []
  for (let i = 0; i < 360; i += 360 / n) {
    const h = i
    const s = 90 + Math.random() * 5
    const l = 70 + Math.random() * 5

    colors.push(hslToHex(h, s, l))
  }
  return colors

  function hslToHex(h, s, l) {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0') // convert to Hex and prefix "0" if needed
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }
}
