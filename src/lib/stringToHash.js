import crypto from 'crypto';

export function stringToHash(inputString, length = 8) {
  // Create a SHA-256 hash of the input string
  const hash = crypto.createHash('sha256').update(inputString).digest('hex');

  // Convert the hash (hex) to a BigInt (integer)
  const hashBigInt = BigInt('0x' + hash);

  // Convert the BigInt to a string and return the first 'length' characters
  // Ensure that the length does not exceed the length of the number
  const numberString = hashBigInt.toString();
  return numberString.substring(0, Math.min(length, numberString.length));
}
