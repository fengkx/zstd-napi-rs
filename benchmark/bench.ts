import { randomBytes } from 'crypto'
import { deflate, gzip, unzip } from 'zlib'

import b from 'benny'

import { compress, decompress } from '../index'

function zlibGzip(bufferLike: Buffer | string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    gzip(bufferLike, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

function zlibDeflate(bufferLike: Buffer | string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    deflate(bufferLike, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

function zlibUnzip(bufferLike: Buffer | string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    unzip(bufferLike, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

async function run() {
  const testData = randomBytes(1024 * 1024)
  const gzipedTestData = await zlibGzip(testData)
  const zstdTestData = await compress(testData)
  const deflateTestData = await zlibDeflate(testData)
  await b.suite(
    'compress',

    b.add('Native zstd', async () => {
      await compress(testData)
    }),

    b.add('Node.js gzip', async () => {
      await zlibGzip(testData)
    }),
    b.add('Node.js deflate', async () => {
      await zlibDeflate(testData)
    }),

    b.cycle(),
    b.complete(),
  )
  await b.suite(
    'decompress',

    b.add('Native zstd', async () => {
      await decompress(zstdTestData)
    }),

    b.add('Node.js gzip', async () => {
      await zlibUnzip(gzipedTestData)
    }),
    b.add('Node.js deflate', async () => {
      await zlibUnzip(deflateTestData)
    }),

    b.cycle(),
    b.complete(),
  )
}

run().catch((e) => {
  console.error(e)
})
