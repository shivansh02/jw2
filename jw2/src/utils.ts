//convert a string to a Uint8Array
export const stringToUint8Array = (str: string): Uint8Array => new TextEncoder().encode(str);

//convert a Uint8Array to a string
export const uint8ArrayToString = (arr: Uint8Array): string => new TextDecoder().decode(arr);

//base64url encode a Uint8Array
export const base64urlEncode = (input: Uint8Array): string => {
    const base64 = Buffer.from(input).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

//base64url decode a string
export const base64urlDecode = (input: string): Uint8Array => {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return Uint8Array.from(Buffer.from(base64, 'base64'));
};


export const createHeader = (): object => ({
    alg: 'HS256',
    typ: 'JWT'
});

//sign JWT
export const sign = async (key: CryptoKey, data: Uint8Array): Promise<Uint8Array> => {
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return new Uint8Array(signature);
};

// Helper function to import a key
export const importKey = async (secret: string): Promise<CryptoKey> => {
    const keyData = stringToUint8Array(secret);
    return crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
};

