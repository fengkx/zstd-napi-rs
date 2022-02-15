import test from 'ava'

import { compress, decompress } from '../index'

test('should defined', (t) => {
  t.is(typeof compress, 'function')
  t.is(typeof decompress, 'function')
})

test('compress should smaller than origianl', async (t) => {
  const original = Buffer.from('A'.repeat(1024 * 1024))
  const compressed = await compress(original)
  t.true(compressed.length < original.length)
})

test('should equal to original after decompress', async (t) => {
  const original = Buffer.from('hello world')
  const compressed = await compress(original)
  const decompressed = await decompress(compressed)
  t.deepEqual(original, decompressed)
})

test('should accept string input', async (t) => {
  const original = 'A'.repeat(1024 * 1024)
  const compressed = await compress(original)
  const decompressed = await decompress(compressed)
  t.true(compressed.length < original.length)
  t.deepEqual(original, decompressed.toString())
})
