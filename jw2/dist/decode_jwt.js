"use strict";
// import { base64urlDecode, importKey, stringToUint8Array, uint8ArrayToString } from './utils';
// import { JwtPayload } from './types';
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
exports.decode_jwt = void 0;
// export const decode_jwt = async (secret: string, jwt: string): Promise<{ id: string, payload: JwtPayload, expires_at: Date }> => {
//     const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
//     const key = await importKey(secret);
//     const data = stringToUint8Array(`${headerBase64}.${payloadBase64}`);
//     const signature = base64urlDecode(signatureBase64);
//     const valid = await crypto.subtle.verify('HMAC', key, signature, data);
//     if (!valid) {
//         throw new Error('Invalid token');
//     }
//     const payload = JSON.parse(uint8ArrayToString(base64urlDecode(payloadBase64)));
//     if (payload.exp < Math.floor(Date.now() / 1000)) {
//         throw new Error('Token has expired');
//     }
//     return {
//         id: payload.sub || '',
//         payload,
//         expires_at: new Date(payload.exp * 1000)
//     };
// };
const utils_1 = require("./utils");
const decode_jwt = (secret, jwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
        if (!headerBase64 || !payloadBase64 || !signatureBase64) {
            throw new Error('Invalid token format');
        }
        const key = yield (0, utils_1.importKey)(secret);
        const data = (0, utils_1.stringToUint8Array)(`${headerBase64}.${payloadBase64}`);
        const signature = (0, utils_1.base64urlDecode)(signatureBase64);
        const valid = yield crypto.subtle.verify('HMAC', key, signature, data);
        if (!valid) {
            throw new Error('Invalid token signature');
        }
        const payload = JSON.parse((0, utils_1.uint8ArrayToString)((0, utils_1.base64urlDecode)(payloadBase64)));
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('Token has expired');
        }
        return {
            id: payload.sub || '',
            payload,
            expires_at: new Date(payload.exp * 1000)
        };
    }
    catch (error) {
        throw new Error(`Failed to decode JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
});
exports.decode_jwt = decode_jwt;
