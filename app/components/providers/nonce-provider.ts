import * as React from 'react';

/**
 * A nonce (number used once) is a random string used in Content Security Policy (CSP)
 * to allow specific inline scripts to execute while blocking malicious ones.
 *
 * This context provider exists to handle nonces differently between server and client:
 *
 * - On the server: We generate and include the nonce to validate inline scripts
 * - On the client: We omit the nonce since:
 *   1. Sending nonces to the client would be a security risk
 *   2. Browsers automatically strip nonce attributes after validation
 *   3. Having different nonce values would cause React hydration mismatches
 */

export const NonceContext = React.createContext<string>('');
export const NonceProvider = NonceContext.Provider;
export const useNonce = () => React.useContext(NonceContext);
