/**
 * Defines a linked list item.
 */
'use strict'
module.exports = class DropItem {
  constructor (drop) {
    this.drop = drop
    this.next = null
  }

  /**
   * Adds the raindrop to the end of the list.
   * @param drop raindrop to be added
   */
  add (drop) {
    let item = this
    while (item.next != null) {
      item = item.next
    }
    item.next = new DropItem(drop)
  }

  /**
   * Removes the raindrop from the list.
   * @param drop raindrop to be removed
   */
  remove (drop) {
    let item = this
    let prevItem = null
    while (item.next != null) {
      prevItem = item
      item = item.next
      if (item.drop.gid === drop.gid) {
        prevItem.next = item.next
      }
    }
  }
}
