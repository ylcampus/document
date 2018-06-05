/**
 * @name 登录雨布特效
 * @author dongjiguo2008123@126.com
 * @date 2018-05
 */
'use strict'
import Drop from './drop'
import CollisionMatrix from './collisionMatrix'
import {stackBlurCanvasRGB} from './stackBlur'
function Rainydays (options, canvas) {
  // if *this* is the window object, start over with a *new* object
  if (this === window) {
    return new Rainydays(options, canvas)
  }

  this.img = options.image
  let defaults = {
    opacity: 1,
    blur: 10,
    crop: [0, 0, this.img.naturalWidth, this.img.naturalHeight],
    enableSizeChange: true,
    parentElement: document.getElementsByTagName('body')[0],
    fps: 30,
    fillStyle: '#8ED6FF',
    enableCollisions: true,
    gravityThreshold: 3,
    gravityAngle: Math.PI / 2,
    gravityAngleVariance: 0,
    reflectionScaledownFactor: 5,
    reflectionDropMappingWidth: 200,
    reflectionDropMappingHeight: 200,
    width: this.img.clientWidth,
    height: this.img.clientHeight,
    position: 'absolute',
    top: 0,
    left: 0
  }

  // add the defaults to options
  for (let option in defaults) {
    if (typeof options[option] === 'undefined') {
      options[option] = defaults[option]
    }
  }
  this.options = options

  this.drops = []

  // prepare canvas elements
  this.canvas = canvas || this.prepareCanvas()
  this.prepareBackground()
  this.prepareGlass()

  // assume defaults
  this.reflection = this.REFLECTION_MINIATURE
  this.trail = this.TRAIL_DROPS
  this.gravity = this.GRAVITY_NON_LINEAR
  this.collision = this.COLLISION_SIMPLE

  // set polyfill of requestAnimationFrame
  this.setRequestAnimFrame()
}

/**
 * Create the main canvas over a given element
 * @returns HTMLElement the canvas
 */
Rainydays.prototype.prepareCanvas = function () {
  let canvas = document.createElement('canvas')
  canvas.style.position = this.options.position
  canvas.style.top = this.options.top
  canvas.style.left = this.options.left
  canvas.width = this.options.width
  canvas.height = this.options.height
  this.options.parentElement.appendChild(canvas)
  if (this.options.enableSizeChange) {
    this.setResizeHandler()
  }
  return canvas
}

Rainydays.prototype.setResizeHandler = function () {
  // use setInterval if oneresize event already use by other.
  if (window.onresize !== null) {
    window.setInterval(this.checkSize.bind(this), 1000)
  } else {
    window.onresize = this.checkSize.bind(this)
    window.onorientationchange = this.checkSize.bind(this)
  }
}

/**
 * Periodically check the size of the underlying element
 */
Rainydays.prototype.checkSize = function () {
  let clientWidth = this.img.clientWidth
  let clientHeight = this.img.clientHeight
  let clientOffsetLeft = this.img.offsetLeft
  let clientOffsetTop = this.img.offsetTop
  let canvasWidth = this.canvas.width
  let canvasHeight = this.canvas.height
  let canvasOffsetLeft = this.canvas.offsetLeft
  let canvasOffsetTop = this.canvas.offsetTop

  if (canvasWidth !== clientWidth || canvasHeight !== clientHeight) {
    this.canvas.width = clientWidth
    this.canvas.height = clientHeight
    this.prepareBackground()
    this.glass.width = this.canvas.width
    this.glass.height = this.canvas.height
    this.prepareReflections()
  }
  if (canvasOffsetLeft !== clientOffsetLeft || canvasOffsetTop !== clientOffsetTop) {
    this.canvas.offsetLeft = clientOffsetLeft
    this.canvas.offsetTop = clientOffsetTop
  }
}

/**
 * Start animation loop
 */
Rainydays.prototype.animateDrops = function () {
  if (this.addDropCallback) {
    this.addDropCallback()
  }
  // |this.drops| array may be changed as we iterate over drops
  let dropsClone = this.drops.slice()
  let newDrops = []
  for (let i = 0; i < dropsClone.length; ++i) {
    if (dropsClone[i].animate()) {
      newDrops.push(dropsClone[i])
    }
  }
  this.drops = newDrops
  window.requestAnimFrame(this.animateDrops.bind(this))
}

/**
 * Polyfill for requestAnimationFrame
 */
Rainydays.prototype.setRequestAnimFrame = function () {
  let fps = this.options.fps
  window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / fps)
      }
  })()
}

/**
 * Create the helper canvas for rendering raindrop reflections.
 */
Rainydays.prototype.prepareReflections = function () {
  this.reflected = document.createElement('canvas')
  this.reflected.width = this.canvas.width / this.options.reflectionScaledownFactor
  this.reflected.height = this.canvas.height / this.options.reflectionScaledownFactor
  let ctx = this.reflected.getContext('2d')
  ctx.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.reflected.width, this.reflected.height)
}

/**
 * Create the glass canvas.
 */
Rainydays.prototype.prepareGlass = function () {
  this.glass = document.createElement('canvas')
  this.glass.width = this.canvas.width
  this.glass.height = this.canvas.height
  this.context = this.glass.getContext('2d')
}

/**
 * Main function for starting rain rendering.
 * @param presets list of presets to be applied
 * @param speed speed of the animation (if not provided or 0 static image will be generated)
 */
Rainydays.prototype.rain = function (presets, speed) {
  // prepare canvas for drop reflections
  if (this.reflection !== this.REFLECTION_NONE) {
    this.prepareReflections()
  }

  this.animateDrops()

  // animation
  this.presets = presets

  this.PRIVATE_GRAVITY_FORCE_FACTOR_Y = (this.options.fps * 0.001) / 25
  this.PRIVATE_GRAVITY_FORCE_FACTOR_X = ((Math.PI / 2) - this.options.gravityAngle) * (this.options.fps * 0.001) / 50

  // prepare gravity matrix
  if (this.options.enableCollisions) {
    // calculate max radius of a drop to establish gravity matrix resolution
    let maxDropRadius = 0
    for (let i = 0; i < presets.length; i++) {
      if (presets[i][0] + presets[i][1] > maxDropRadius) {
        maxDropRadius = Math.floor(presets[i][0] + presets[i][1])
      }
    }

    if (maxDropRadius > 0) {
      // initialize the gravity matrix
      let mwi = Math.ceil(this.canvas.width / maxDropRadius)
      let mhi = Math.ceil(this.canvas.height / maxDropRadius)
      this.matrix = new CollisionMatrix(mwi, mhi, maxDropRadius)
    } else {
      this.options.enableCollisions = false
    }
  }

  for (let j = 0; j < presets.length; j++) {
    if (!presets[j][3]) {
      presets[j][3] = -1
    }
  }

  let lastExecutionTime = 0
  this.addDropCallback = function () {
    let timestamp = new Date().getTime()
    if (timestamp - lastExecutionTime < speed) {
      return
    }
    lastExecutionTime = timestamp
    let context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height)
    // select matching preset
    let preset
    for (let i = 0; i < presets.length; i++) {
      if (presets[i][2] > 1 || presets[i][3] === -1) {
        if (presets[i][3] !== 0) {
          presets[i][3]--
          for (let y = 0; y < presets[i][2]; ++y) {
            this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, presets[i][0], presets[i][1]))
          }
        }
      } else if (Math.random() < presets[i][2]) {
        preset = presets[i]
        break
      }
    }
    if (preset) {
      this.putDrop(new Drop(this, Math.random() * this.canvas.width, Math.random() * this.canvas.height, preset[0], preset[1]))
    }
    context.save()
    context.globalAlpha = this.options.opacity
    context.drawImage(this.glass, 0, 0, this.canvas.width, this.canvas.height)
    context.restore()
  }.bind(this)
}

/**
 * Adds a new raindrop to the animation.
 * @param drop drop object to be added to the animation
 */
Rainydays.prototype.putDrop = function (drop) {
  drop.draw()
  if (this.gravity && drop.r > this.options.gravityThreshold) {
    if (this.options.enableCollisions) {
      this.matrix.update(drop)
    }
    this.drops.push(drop)
  }
}

/**
 * Clear the drop and remove from the list if applicable.
 * @drop to be cleared
 * @force force removal from the list
 * result if true animation of this drop should be stopped
 */
Rainydays.prototype.clearDrop = function (drop, force) {
  let result = drop.clear(force)
  if (result) {
    let index = this.drops.indexOf(drop)
    if (index >= 0) {
      this.drops.splice(index, 1)
    }
  }
  return result
}

/**
 * TRAIL function: no trail at all
 */
Rainydays.prototype.TRAIL_NONE = function () {
  // nothing going on here
}

/**
 * TRAIL function: trail of small drops (default)
 * @param drop raindrop object
 */
Rainydays.prototype.TRAIL_DROPS = function (drop) {
  if (!drop.trailY || drop.y - drop.trailY >= Math.random() * 100 * drop.r) {
    drop.trailY = drop.y
    this.putDrop(new Drop(this, drop.x + (Math.random() * 2 - 1) * Math.random(), drop.y - drop.r - 5, Math.ceil(drop.r / 5), 0))
  }
}

/**
 * TRAIL function: trail of unblurred image
 * @param drop raindrop object
 */
Rainydays.prototype.TRAIL_SMUDGE = function (drop) {
  let y = drop.y - drop.r - 3
  let x = drop.x - drop.r / 2 + (Math.random() * 2)
  if (y < 0 || x < 0) {
    return
  }
  this.context.drawImage(this.clearbackground, x, y, drop.r, 2, x, y, drop.r, 2)
}

/**
 * GRAVITY function: no gravity at all
 * @returns Boolean true if the animation is stopped
 */
Rainydays.prototype.GRAVITY_NONE = function () {
  return true
}

/**
 * GRAVITY function: linear gravity
 * @param drop raindrop object
 * @returns Boolean true if the animation is stopped
 */
Rainydays.prototype.GRAVITY_LINEAR = function (drop) {
  if (this.clearDrop(drop)) {
    return true
  }

  if (drop.yspeed) {
    drop.yspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(drop.r)
    drop.xspeed += this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(drop.r)
  } else {
    drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y
    drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X
  }

  drop.y += drop.yspeed
  drop.draw()
  return false
}

/**
 * GRAVITY function: non-linear gravity (default)
 * @param drop raindrop object
 * @returns Boolean true if the animation is stopped
 */
Rainydays.prototype.GRAVITY_NON_LINEAR = function (drop) {
  if (this.clearDrop(drop)) {
    return true
  }

  if (drop.collided) {
    drop.collided = false
    drop.seed = Math.floor(drop.r * Math.random() * this.options.fps)
    drop.skipping = false
    drop.slowing = false
  } else if (!drop.seed || drop.seed < 0) {
    drop.seed = Math.floor(drop.r * Math.random() * this.options.fps)
    drop.skipping = (drop.skipping === false)
    drop.slowing = true
  }

  drop.seed--

  if (drop.yspeed) {
    if (drop.slowing) {
      drop.yspeed /= 1.1
      drop.xspeed /= 1.1
      if (drop.yspeed < this.PRIVATE_GRAVITY_FORCE_FACTOR_Y) {
        drop.slowing = false
      }
    } else if (drop.skipping) {
      drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y
      drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X
    } else {
      drop.yspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_Y * Math.floor(drop.r)
      drop.xspeed += 1 * this.PRIVATE_GRAVITY_FORCE_FACTOR_X * Math.floor(drop.r)
    }
  } else {
    drop.yspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_Y
    drop.xspeed = this.PRIVATE_GRAVITY_FORCE_FACTOR_X
  }

  if (this.options.gravityAngleVariance !== 0) {
    drop.xspeed += ((Math.random() * 2 - 1) * drop.yspeed * this.options.gravityAngleVariance)
  }

  drop.y += drop.yspeed
  drop.x += drop.xspeed

  drop.draw()
  return false
}

/**
 * Utility function to return positive min value
 * @param val1 first number
 * @param val2 second number
 */
Rainydays.prototype.positiveMin = function (val1, val2) {
  let result = 0
  if (val1 < val2) {
    if (val1 <= 0) {
      result = val2
    } else {
      result = val1
    }
  } else {
    if (val2 <= 0) {
      result = val1
    } else {
      result = val2
    }
  }
  return result <= 0 ? 1 : result
}

/**
 * REFLECTION function: no reflection at all
 */
Rainydays.prototype.REFLECTION_NONE = function () {
  this.context.fillStyle = this.options.fillStyle
  this.context.fill()
}

/**
 * REFLECTION function: miniature reflection (default)
 * @param drop raindrop object
 */
Rainydays.prototype.REFLECTION_MINIATURE = function (drop) {
  let sx = Math.max((drop.x - this.options.reflectionDropMappingWidth) / this.options.reflectionScaledownFactor, 0)
  let sy = Math.max((drop.y - this.options.reflectionDropMappingHeight) / this.options.reflectionScaledownFactor, 0)
  let sw = this.positiveMin(this.options.reflectionDropMappingWidth * 2 / this.options.reflectionScaledownFactor, this.reflected.width - sx)
  let sh = this.positiveMin(this.options.reflectionDropMappingHeight * 2 / this.options.reflectionScaledownFactor, this.reflected.height - sy)
  let dx = Math.max(drop.x - 1.1 * drop.r, 0)
  let dy = Math.max(drop.y - 1.1 * drop.r, 0)
  this.context.drawImage(this.reflected, sx, sy, sw, sh, dx, dy, drop.r * 2, drop.r * 2)
}

/**
 * COLLISION function: default collision implementation
 * @param drop one of the drops colliding
 * @param collisions list of potential collisions
 */
Rainydays.prototype.COLLISION_SIMPLE = function (drop, collisions) {
  let item = collisions
  let drop2
  while (item != null) {
    let p = item.drop
    if (Math.sqrt(Math.pow(drop.x - p.x, 2) + Math.pow(drop.y - p.y, 2)) < (drop.r + p.r)) {
      drop2 = p
      break
    }
    item = item.next
  }

  if (!drop2) {
    return
  }

  // rename so that we're dealing with low/high drops
  let higher, lower
  if (drop.y > drop2.y) {
    higher = drop
    lower = drop2
  } else {
    higher = drop2
    lower = drop
  }

  this.clearDrop(lower)
  // force stopping the second drop
  this.clearDrop(higher, true)
  this.matrix.remove(higher)
  lower.draw()

  lower.colliding = higher
  lower.collided = true
}

/**
 * Resizes canvas, draws original image and applies blurring algorithm.
 */
Rainydays.prototype.prepareBackground = function () {
  this.background = document.createElement('canvas')
  this.background.width = this.canvas.width
  this.background.height = this.canvas.height

  this.clearbackground = document.createElement('canvas')
  this.clearbackground.width = this.canvas.width
  this.clearbackground.height = this.canvas.height

  let context = this.background.getContext('2d')
  context.clearRect(0, 0, this.canvas.width, this.canvas.height)

  context.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height)

  context = this.clearbackground.getContext('2d')
  context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  context.drawImage(this.img, this.options.crop[0], this.options.crop[1], this.options.crop[2], this.options.crop[3], 0, 0, this.canvas.width, this.canvas.height)

  if (!isNaN(this.options.blur) && this.options.blur >= 1) {
    stackBlurCanvasRGB(this.canvas.width, this.canvas.height, this.options.blur, this)
  }
}
module.exports = Rainydays
