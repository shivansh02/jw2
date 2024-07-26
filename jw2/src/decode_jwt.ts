import { base64urlDecode, importKey, stringToUint8Array, uint8ArrayToString } from './utils';
import { JwtPayload } from './types';

export const decode_jwt = async (secret: string, jwt: string): Promise<{ id: string; payload: JwtPayload; expires_at: Date }> => {
    try {
        const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
        if (!headerBase64 || !payloadBase64 || !signatureBase64) {
            throw new Error('Invalid token format');
        }

        const key = await importKey(secret);
        const data = stringToUint8Array(`${headerBase64}.${payloadBase64}`);
        const signature = base64urlDecode(signatureBase64);

        const valid = await crypto.subtle.verify('HMAC', key, signature, data);
        if (!valid) {
            throw new Error('Invalid token signature');
        }

        const payload = JSON.parse(uint8ArrayToString(base64urlDecode(payloadBase64)));
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('Token has expired');
        }

        return {
            id: payload.sub || '',
            payload,
            expires_at: new Date(payload.exp * 1000)
        };
    } catch (error) {
        throw new Error(`Failed to decode JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
};