import { importKey, stringToUint8Array, base64urlDecode, uint8ArrayToString } from './utils';

export const validate_jwt = async (secret: string, jwt: string): Promise<boolean> => {
    try {
        const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
        if (!headerBase64 || !payloadBase64 || !signatureBase64) {
            throw new Error('Invalid token format');
        }

        // Step 1: Verify the signature
        const key = await importKey(secret);
        const data = stringToUint8Array(`${headerBase64}.${payloadBase64}`);
        const signature = base64urlDecode(signatureBase64);
        const validSignature = await crypto.subtle.verify('HMAC', key, signature, data);

        if (!validSignature) {
            return false;
        }

        // verify claims
        const payload = JSON.parse(uint8ArrayToString(base64urlDecode(payloadBase64)));

        // check if the token is expired
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            return false;
        }

        return true;
    } catch (error) {
        throw new Error(`Failed to validate JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
};