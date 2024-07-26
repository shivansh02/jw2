export declare const stringToUint8Array: (str: string) => Uint8Array;
export declare const uint8ArrayToString: (arr: Uint8Array) => string;
export declare const base64urlEncode: (input: Uint8Array) => string;
export declare const base64urlDecode: (input: string) => Uint8Array;
export declare const createHeader: () => object;
export declare const sign: (key: CryptoKey, data: Uint8Array) => Promise<Uint8Array>;
export declare const importKey: (secret: string) => Promise<CryptoKey>;
