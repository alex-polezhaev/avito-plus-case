import { customAlphabet } from 'nanoid';

/**
 * Alphabet used to mint short, Avito-friendly ad ids (lowercase latin + digits).
 * Kept ambiguity-tolerant on purpose: these ids end up in a spreadsheet column
 * that humans occasionally copy by hand.
 */
export const ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz1234567890';
export const ID_LENGTH = 6;

/**
 * mintId
 * Generates a fresh 6-character ad id. Used when a blocked/expired listing is
 * re-published and needs a brand-new identifier so Avito treats it as new.
 *
 * @returns {string} 6-character id drawn from ID_ALPHABET
 */
const mintId = customAlphabet(ID_ALPHABET, ID_LENGTH);

export default mintId;
