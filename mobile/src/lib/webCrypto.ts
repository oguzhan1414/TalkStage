import * as ExpoCrypto from 'expo-crypto';

/**
 * The phone's JavaScript engine has no WebCrypto. Supabase's PKCE sign-in (Google, browser flow) then falls back to a
 * plain code challenge and warns "WebCrypto API is not supported". This fills in the two pieces it uses from
 * expo-crypto: `crypto.getRandomValues` (the code verifier) and `crypto.subtle.digest('SHA-256', …)` (the S256
 * challenge). Only what is missing is added; a real WebCrypto (web) is left alone. Import before the Supabase client.
 */
type CryptoLike = {
  getRandomValues?: <T extends ArrayBufferView | null>(array: T) => T;
  subtle?: { digest: (algorithm: string, data: BufferSource) => Promise<ArrayBuffer> };
};

const g = globalThis as unknown as { crypto?: CryptoLike };
if (!g.crypto) g.crypto = {};
const c = g.crypto;

if (typeof c.getRandomValues !== 'function') {
  c.getRandomValues = (<T extends ArrayBufferView | null>(array: T): T => {
    ExpoCrypto.getRandomValues(array as unknown as Uint8Array);
    return array;
  }) as CryptoLike['getRandomValues'];
}

if (!c.subtle) {
  c.subtle = {
    digest: (algorithm, data) => ExpoCrypto.digest(algorithm as ExpoCrypto.CryptoDigestAlgorithm, data),
  };
}
