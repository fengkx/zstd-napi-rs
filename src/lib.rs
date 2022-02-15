#![deny(clippy::all)]
#![allow(unused)]

use std::io::Cursor;

use napi_derive::napi;
use napi::{bindgen_prelude::*, tokio::io::{self, ReadBuf}};
use async_compression::{
  tokio::write::{ZstdEncoder},
  tokio::bufread::{ZstdDecoder},
};
use tokio::io::{AsyncWriteExt, AsyncReadExt};


#[cfg(all(
  any(windows, unix),
  target_arch = "x86_64",
  not(target_env = "musl"),
  not(debug_assertions)
))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;

#[napi]
pub async fn compress(input: Buffer) -> Result<Buffer> {
  let input: Vec<u8> = input.into();
  let mut output = Vec::new();
  let mut encoder = ZstdEncoder::new(&mut output);
  tokio::io::AsyncWriteExt::write_all(&mut encoder, &input).await.unwrap();
  encoder.shutdown().await?;
  Ok(Buffer::from(output))
}

#[napi]
pub async fn decompress(input: Buffer) -> Result<Buffer> {
  let input: Vec<u8> = input.into();
  let mut output = Vec::new();
  let mut decoder = ZstdDecoder::new(Cursor::new(input));
  let r = decoder.read_to_end(&mut output).await;
  Ok(Buffer::from(output))
}