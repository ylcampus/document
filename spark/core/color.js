/**
 * Defines a color class.
 */
'use strict'
module.exports = class Color {
  constructor (min) {
    min = min || 0
    this.r = this.colorValue(min)
    this.g = this.colorValue(min)
    this.b = this.colorValue(min)
    this.style = this.createColorStyle(this.r, this.g, this.b)
  }
  // 颜色值
  colorValue (min) {
    return Math.floor(Math.random() * 255 + min)
  }
  // 颜色样式
  createColorStyle (r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
  }
}
