#![deny(clippy::all)]
#![allow(unused)]

use std::io::Cursor;

use async_compression::{tokio::bufread::ZstdDecoder, tokio::write::ZstdEncoder};
use napi::{
  bindgen_prelude::*,
  tokio::io::{self, ReadBuf},
};
use napi_derive::napi;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[napi]
pub async fn compress(input: Either<String, Buffer>) -> Result<Buffer> {
  let input: &[u8] = match &input {
    Either::A(str) => str.as_bytes(),
    Either::B(buf) => buf.as_ref(),
  };
  let mut output = Vec::new();
  let mut encoder = ZstdEncoder::new(&mut output);
  tokio::io::AsyncWriteExt::write_all(&mut encoder, &input)
    .await
    .unwrap();
  encoder.shutdown().await?;
  Ok(Buffer::from(output))
}

#[napi]
pub async fn decompress(input: Either<String, Buffer>) -> Result<Buffer> {
  let input: &[u8] = match &input {
    Either::A(str) => str.as_bytes(),
    Either::B(buf) => buf.as_ref(),
  };
  let mut output = Vec::new();
  let mut decoder = ZstdDecoder::new(Cursor::new(input));
  let r = decoder.read_to_end(&mut output).await;
  Ok(Buffer::from(output))
}
