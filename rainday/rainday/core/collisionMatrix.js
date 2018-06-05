/**
 * Defines a gravity matrix object which handles collision detection.
 * @param x number of columns in the matrix
 * @param y number of rows in the matrix
 * @param r grid size
 */
'use strict'
import DropItem from './dropItem'
module.exports = class CollisionMatrix {
  constructor (x, y, r) {
    this.resolution = r
    this.xc = x
    this.yc = y
    this.matrix = new Array(x)
    for (let i = 0; i <= (x + 5); i++) {
      this.matrix[i] = new Array(y)
      for (let j = 0; j <= (y + 5); ++j) {
        this.matrix[i][j] = new DropItem(null)
      }
    }
  }

  /**
   * Updates position of the given drop on the collision matrix.
   * @param drop raindrop to be positioned/repositioned
   * @param forceDelete if true the raindrop will be removed from the matrix
   * @returns collisions if any
   */
  update (drop, forceDelete) {
    if (drop.gid) {
      if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
        return null
      }
      this.matrix[drop.gmx][drop.gmy].remove(drop)
      if (forceDelete) {
        return null
      }

      drop.gmx = Math.floor(drop.x / this.resolution)
      drop.gmy = Math.floor(drop.y / this.resolution)
      if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
        return null
      }
      this.matrix[drop.gmx][drop.gmy].add(drop)

      let collisions = this.collisions(drop)
      if (collisions && collisions.next != null) {
        return collisions.next
      }
    } else {
      drop.gid = Math.random().toString(36).substr(2, 9)
      drop.gmx = Math.floor(drop.x / this.resolution)
      drop.gmy = Math.floor(drop.y / this.resolution)
      if (!this.matrix[drop.gmx] || !this.matrix[drop.gmx][drop.gmy]) {
        return null
      }

      this.matrix[drop.gmx][drop.gmy].add(drop)
    }
    return null
  }

  /**
   * Looks for collisions with the given raindrop.
   * @param drop raindrop to be checked
   * @returns DropItem list of drops that collide with it
   */
  collisions (drop) {
    let item = new DropItem(null)
    let first = item

    item = this.addAll(item, drop.gmx - 1, drop.gmy + 1)
    item = this.addAll(item, drop.gmx, drop.gmy + 1)
    item = this.addAll(item, drop.gmx + 1, drop.gmy + 1)

    return first
  }

  /**
   * Appends all found drop at a given location to the given item.
   * @param to item to which the results will be appended to
   * @param x x position in the matrix
   * @param y y position in the matrix
   * @returns last discovered item on the list
   */
  addAll (to, x, y) {
    if (x > 0 && y > 0 && x < this.xc && y < this.yc) {
      let items = this.matrix[x][y]
      while (items.next != null) {
        items = items.next
        to.next = new DropItem(items.drop)
        to = to.next
      }
    }
    return to
  }

  /**
   * Removed the drop from its current position
   * @param drop to be removed
   */
  remove (drop) {
    this.matrix[drop.gmx][drop.gmy].remove(drop)
  }
}
