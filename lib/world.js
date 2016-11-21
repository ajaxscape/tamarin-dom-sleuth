'use strict'

const cheerio = require('cheerio')

function loadRoot (world, selector) {
  return world.getHtml(selector)
    .then((html) =>
      Promise.resolve(cheerio.load(html)))
}

module.exports = (World) => (() => {
  class ExtendedWorld extends World {
    getHtml (selector) {
      return this.waitFor(selector)
        .then((el) => el.getAttribute('outerHTML'))
    }

    select (selector, query) {
      return loadRoot(this, selector)
        .then(($) =>
          Promise.resolve($(':first-child ' + (query || ''))))
    }
  }
  return ExtendedWorld
})()
