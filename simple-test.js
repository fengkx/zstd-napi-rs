const { assert } = require('console')
const fs = require('fs')
const path = require('path')

const { compress, decompress } = require('./index')

async function main() {
  const buf = fs.readFileSync(path.join(__dirname, 'Cargo.toml'))
  const compressed = await compress(buf)
  const decompressed = await decompress(compressed)
  console.assert(compressed.length < buf.length, 'Compressed size is smaller than original')
  console.assert(decompressed.equals(buf), 'Decompressed data is equal to original')
  console.info('Simple test passed')
}

main()
