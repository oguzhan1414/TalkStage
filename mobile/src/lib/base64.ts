const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** Dependency-free base64 encoder — avoids relying on `btoa` (not guaranteed on every RN engine/version). */
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = bytes[i + 1];
    const b3 = bytes[i + 2];
    result += BASE64_CHARS[b1 >> 2];
    result += BASE64_CHARS[((b1 & 0x03) << 4) | (b2 !== undefined ? b2 >> 4 : 0)];
    result += b2 !== undefined ? BASE64_CHARS[((b2 & 0x0f) << 2) | (b3 !== undefined ? b3 >> 6 : 0)] : '=';
    result += b3 !== undefined ? BASE64_CHARS[b3 & 0x3f] : '=';
  }
  return result;
}
