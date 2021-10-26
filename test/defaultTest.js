const schema = require('@uniswap/token-lists/src/tokenlist.schema.json')
const { expect } = require('chai')
const Ajv = require('ajv').default
const addFormats = require('ajv-formats').default
const buildList = require('../src/build')

const ajv = new Ajv({ allErrors: true, format: 'full' })
addFormats(ajv)
const validator = ajv.compile(schema)

describe('buildList', () => {
  const tokenlists = buildList()

  it('validates', () => {
    expect(validator(tokenlists.allTokensTokenList)).to.equal(true)
    expect(validator(tokenlists.defaultTokenList)).to.equal(true)
  })

  it('contains no duplicate child addresses', () => {
    let map = {}
    for (const token of tokenlists.allTokensTokenList.tokens) {
      const key = `${token.address}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate child address: ${token.address} - allTokens list`)
      map[key] = true
    }
    map = {}
    for (const token of tokenlists.defaultTokenList.tokens) {
      const key = `${token.address}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate child address: ${token.address} - default list`)
      map[key] = true
    }
  })

  it('contains no duplicate parent addresses', () => {
    let map = {}
    for (const token of tokenlists.allTokensTokenList.tokens) {
      const key = `${token.extensions.parentAddress}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate parent address: ${token.extensions.parentAddress} - allTokens list`)
      map[key] = true
    }
    map = {}
    for (const token of tokenlists.defaultTokenList.tokens) {
      const key = `${token.extensions.parentAddress}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate parent address: ${token.extensions.parentAddress} - default list`)
      map[key] = true
    }
  })

  it('contains no duplicate symbols', () => {
    let map = {}
    for (const token of tokenlists.allTokensTokenList.tokens) {
      const key = `${token.symbol.toLowerCase()}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate symbol: ${token.symbol} - allTokens list`)
      map[key] = true
    }
    map = {}
    for (const token of tokenlists.defaultTokenList.tokens) {
      const key = `${token.symbol.toLowerCase()}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate symbol: ${token.symbol} - default list`)
      map[key] = true
    }
  })

  it('contains no duplicate names', () => {
    let map = {}
    for (const token of tokenlists.allTokensTokenList.tokens) {
      const key = `${token.name.toLowerCase()}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate name: ${token.name} - allTokens list`)
      map[key] = true
    }
    map = {}
    for (const token of tokenlists.defaultTokenList.tokens) {
      const key = `${token.name.toLowerCase()}`
      expect(typeof map[key])
        .to.equal('undefined', `duplicate name: ${token.name} - default list`)
      map[key] = true
    }
  })
})
