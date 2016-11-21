/* eslint-disable no-new */
'use strict'

const extend = require('../lib/world')
const chai = require('chai')

chai
  .use(require('chai-as-promised'))
  .should()

const dummyDriver = {}

describe('world class', function () {
  const el = {
    getAttribute: () => `
    <root>
      <ul>
        <li>a</li>
        <li>b</li>
        <li>c</li>
        <li>d</li>
      </ul>
    </root>`
  }
  class World {
    waitFor () {
      return Promise.resolve(el)
    }
  }
  const ExtendedWorld = extend(World)

  it('Make sure getHtml returns html', function () {
    const world = new ExtendedWorld(dummyDriver)
    return Promise.all([
      world.getHtml().should.eventually.contain('<li>a</li>'),
      world.getHtml().should.eventually.contain('<li>b</li>'),
      world.getHtml().should.eventually.contain('<li>c</li>'),
      world.getHtml().should.eventually.contain('<li>d</li>')
    ])
  })

  it('Make sure select returns a read-only element that can be queried', function () {
    const world = new ExtendedWorld(dummyDriver)
    return Promise.all([
      world.select({}, 'ul').should.eventually.have.lengthOf(1),
      world.select({}, 'li').should.eventually.have.lengthOf(4),
      world.select({}, 'li:first-of-type')
        .then((el) => Promise.resolve(el.text().should.equal('a')))
    ])
  })
})
