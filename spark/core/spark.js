/**
 * @name 火花背景特效
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
import Color from './color'
import Dot from './dot'
function Spark (options) {
  let canvas = options.canvas
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  let ctx = canvas.getContext('2d')
  ctx.lineWidth = 0.3
  ctx.strokeStyle = (new Color(150)).style
  this.canvas = canvas
  this.ctx = ctx
  this.mousePosition = {
    x: 30 * this.canvas.width / 100,
    y: 30 * this.canvas.height / 100
  }
  this.dots = {
    nb: 750,
    distance: 50,
    d_radius: 100,
    array: []
  }
}

/**
 * 创建圆点
 */
Spark.prototype.createDots = function () {
  for (let i = 0; i < this.dots.nb; i++) {
    this.dots.array.push(new Dot(this.canvas, this.ctx))
  }
}

/**
 * 移动圆点
 */
Spark.prototype.moveDots = function () {
  for (let i = 0; i < this.dots.nb; i++) {
    let dot = this.dots.array[i]
    if (dot.y < 0 || dot.y > this.canvas.height) {
      dot.vx = dot.vx
      dot.vy = -dot.vy
    } else if (dot.x < 0 || dot.x > this.canvas.width) {
      dot.vx = -dot.vx
      dot.vy = dot.vy
    }
    dot.x += dot.vx
    dot.y += dot.vy
  }
}

/**
 * 创建rgb颜色
 */
Spark.prototype.createColorStyle = function (r, g, b) {
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
}

/**
 * 平滑圆点
 */
Spark.prototype.mixComponents = function (comp1, weight1, comp2, weight2) {
  return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
}

/**
 * 颜色平滑处理
 */
Spark.prototype.averageColorStyles = function (dot1, dot2) {
  let color1 = dot1.color
  let color2 = dot2.color
  let r = this.mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
  let g = this.mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
  let b = this.mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
  return this.createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
}

/**
 * 连接圆点
 */
Spark.prototype.connectDots = function () {
  for (let i = 0; i < this.dots.nb; i++) {
    for (let j = 0; j < this.dots.nb; j++) {
      let iDot = this.dots.array[i]
      let jDot = this.dots.array[j]
      if ((iDot.x - jDot.x) < this.dots.distance && (iDot.y - jDot.y) < this.dots.distance && (iDot.x - jDot.x) > -this.dots.distance && (iDot.y - jDot.y) > -this.dots.distance) {
        if ((iDot.x - this.mousePosition.x) < this.dots.d_radius && (iDot.y - this.mousePosition.y) < this.dots.d_radius && (iDot.x - this.mousePosition.x) > -this.dots.d_radius && (iDot.y - this.mousePosition.y) > -this.dots.d_radius) {
          this.ctx.beginPath()
          this.ctx.strokeStyle = this.averageColorStyles(iDot, jDot)
          this.ctx.moveTo(iDot.x, iDot.y)
          this.ctx.lineTo(jDot.x, jDot.y)
          this.ctx.stroke()
          this.ctx.closePath()
        }
      }
    }
  }
}

/**
 * 绘制圆点
 */
Spark.prototype.drawDots = function () {
  for (let i = 0; i < this.dots.nb; i++) {
    let dot = this.dots.array[i]
    dot.draw()
  }
}

/**
 * 圆点动画 - 有问题
 */
Spark.prototype.animateDots = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  this.moveDots()
  this.connectDots()
  this.drawDots()
  requestAnimationFrame(this.animateDots.bind(this))
}

/**
 * 启动动画
 * @returns HTMLElement the canvas
 */
Spark.prototype.start = function () {
  // 鼠标移入
  this.canvas.addEventListener('mousemove', (e) => {
    this.mousePosition.x = e.pageX
    this.mousePosition.y = e.pageY
  })

  // 鼠标移出
  this.canvas.addEventListener('mouseleave', (e) => {
    this.mousePosition.x = this.canvas.width / 2
    this.mousePosition.y = this.canvas.height / 2
  })

  // 动态圆点
  this.createDots()
  this.animateDots()
}
module.exports = Spark
