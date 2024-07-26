// import { base64urlEncode, createHeader, importKey, sign, stringToUint8Array } from './utils';
// import { JwtPayload } from './types';

// export const encode_jwt = async (secret: string, id: string | number, payload: JwtPayload, ttl: number = 3600): Promise<string> => {
//     const header = JSON.stringify(createHeader());
//     const payloadWithExp = { ...payload, exp: Math.floor(Date.now() / 1000) + ttl };
    
//     const headerBase64 = base64urlEncode(stringToUint8Array(header));
//     const payloadBase64 = base64urlEncode(stringToUint8Array(JSON.stringify(payloadWithExp)));

//     const key = await importKey(secret);
//     const signatureBase64 = base64urlEncode(await sign(key, stringToUint8Array(`${headerBase64}.${payloadBase64}`)));

//     return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
// };

import { base64urlEncode, createHeader, importKey, sign, stringToUint8Array } from './utils';
import { JwtPayload } from './types';

export const encode_jwt = async (secret: string, id: string | number, payload: JwtPayload, ttl: number = 3600): Promise<string> => {
    try {
        const header = JSON.stringify(createHeader());
        const payloadWithExp = { ...payload, exp: Math.floor(Date.now() / 1000) + ttl };
        
        const headerBase64 = base64urlEncode(stringToUint8Array(header));
        const payloadBase64 = base64urlEncode(stringToUint8Array(JSON.stringify(payloadWithExp)));

        const key = await importKey(secret);
        const signatureBase64 = base64urlEncode(await sign(key, stringToUint8Array(`${headerBase64}.${payloadBase64}`)));

        return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
    } catch (error) {
        throw new Error(`Failed to encode JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
};