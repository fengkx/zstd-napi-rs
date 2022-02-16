# `zstd-napi`

![https://github.com/napi-rs/package-template/actions](https://github.com/napi-rs/package-template/workflows/CI/badge.svg)

> zstd-rs(async_compression) binding for Node.js

## Install this test package

```
pnpm add @fengkx/zstd-napi
yarn add @fengkx/zstd-napi
npm i @fengkx/zstd-napi
```

## Support matrix

### Operating Systems

|                  | node12 | node14 | node16 |
| ---------------- | ------ | ------ | ------ |
| Windows x64      | ✓      | ✓      | ✓      |
| Windows x32      | ✓      | ✓      | ✓      |
| Windows arm64    | ✓      | ✓      | ✓      |
| macOS x64        | ✓      | ✓      | ✓      |
| macOS arm64      | ✓      | ✓      | ✓      |
| Linux x64 gnu    | ✓      | ✓      | ✓      |
| Linux x64 musl   | ✓      | ✓      | ✓      |
| Linux arm gnu    | ✓      | ✓      | ✓      |
| Linux arm64 gnu  | ✓      | ✓      | ✓      |
| Linux arm64 musl | ✓      | ✓      | ✓      |
| Android arm64    | ✓      | ✓      | ✓      |
| Android armv7    | ✓      | ✓      | ✓      |
| FreeBSD x64      | ✓      | ✓      | ✓      |

# API

```typescript
export function compress(input: string | Buffer): Promise<Buffer>
export function decompress(input: string | Buffer): Promise<Buffer>
```

# Performance

```
Running "compress" suite...
Progress: 100%

  Native zstd:
    793 ops/s, ±3.07%   | fastest

  Node.js gzip:
    13 ops/s, ±0.81%    | slowest, 98.36% slower

  Node.js deflate:
    20 ops/s, ±10.36%    | 97.48% slower

Finished 3 cases!
  Fastest: Native zstd
  Slowest: Node.js gzip
Running "decompress" suite...
Progress: 100%

  Native zstd:
    1 071 ops/s, ±2.37%   | fastest

  Node.js gzip:
    402 ops/s, ±2.89%     | 62.46% slower

  Node.js deflate:
    394 ops/s, ±2.23%     | slowest, 63.21% slower

Finished 3 cases!
  Fastest: Native zstd
  Slowest: Node.js deflate
Done in 36.14s.
```
