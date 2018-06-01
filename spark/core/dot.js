/**
 * Defines a dot class.
 */
'use strict'
import Color from './color'
module.exports = class Dot {
  constructor (canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = -0.5 + Math.random()
    this.vy = -0.5 + Math.random()
    this.radius = Math.random() * 2
    this.color = new Color()
  }

  // 绘制圆点
  draw () {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color.style
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.ctx.fill()
  }
}
