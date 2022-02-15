/* eslint-disable */

export class ExternalObject<T> {
  readonly '': {
    readonly '': unique symbol
    [K: symbol]: T
  }
}
export function compress(input: string | Buffer): Promise<Buffer>
export function decompress(input: string | Buffer): Promise<Buffer>
