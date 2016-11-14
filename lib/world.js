const cheerio = require('cheerio')

module.exports = (World) => (() => {
  class ExtendedWorld extends World {
    getHtml (selector) {
      return this.findElement(selector)
        .then((el) => el.getAttribute('outerHTML'))
    }

    load (selector) {
      return this.getHtml(selector)
        .then((html) => Promise.resolve(cheerio.load(html)))
    }

    select (selector, query) {
      return this.load(selector)
        .then(($) => Promise.resolve($(':first-child ' + (query || ''))))
    }
  }
  return ExtendedWorld
})()
