import fp from 'fastify-plugin'
import bcrypt from 'bcryptjs'

const { hash: _hash, compare: _compare } = bcrypt

export default fp(
  function (fastify, opts, next) {
    const saltWorkFactor = opts.HASH_FACTOR || 10

    const hash = async function (pwd) {
      return _hash(pwd, saltWorkFactor)
    }

    const compare = async function (claim1, claim2) {
      return _compare(claim1, claim2)
    }

    fastify
      .decorate('bcrypt', {
        hash,
        compare,
      })
      .decorateRequest('bcryptHash', hash)
      .decorateRequest('bcryptCompare', compare)

    next()
  },
  {
    name: 'bcrypt',
  }
)
