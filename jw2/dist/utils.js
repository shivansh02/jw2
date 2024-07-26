"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importKey = exports.sign = exports.createHeader = exports.base64urlDecode = exports.base64urlEncode = exports.uint8ArrayToString = exports.stringToUint8Array = void 0;
//convert a string to a Uint8Array
const stringToUint8Array = (str) => new TextEncoder().encode(str);
exports.stringToUint8Array = stringToUint8Array;
//convert a Uint8Array to a string
const uint8ArrayToString = (arr) => new TextDecoder().decode(arr);
exports.uint8ArrayToString = uint8ArrayToString;
//base64url encode a Uint8Array
const base64urlEncode = (input) => {
    const base64 = Buffer.from(input).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
exports.base64urlEncode = base64urlEncode;
//base64url decode a string
const base64urlDecode = (input) => {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return Uint8Array.from(Buffer.from(base64, 'base64'));
};
exports.base64urlDecode = base64urlDecode;
const createHeader = () => ({
    alg: 'HS256',
    typ: 'JWT'
});
exports.createHeader = createHeader;
//sign JWT
const sign = (key, data) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield crypto.subtle.sign('HMAC', key, data);
    return new Uint8Array(signature);
});
exports.sign = sign;
// Helper function to import a key
const importKey = (secret) => __awaiter(void 0, void 0, void 0, function* () {
    const keyData = (0, exports.stringToUint8Array)(secret);
    return crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
});
exports.importKey = importKey;
