"use strict";
// import { importKey, stringToUint8Array, base64urlDecode, uint8ArrayToString } from './utils';
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
exports.validate_jwt = void 0;
// export const validate_jwt = async (secret: string, jwt: string): Promise<boolean> => {
//     try {
//         const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
//         // Step 1: Verify the signature
//         const key = await importKey(secret);
//         const data = stringToUint8Array(`${headerBase64}.${payloadBase64}`);
//         const signature = base64urlDecode(signatureBase64);
//         const validSignature = await crypto.subtle.verify('HMAC', key, signature, data);
//         if (!validSignature) {
//             return false;
//         }
//         // verify claims
//         const payload = JSON.parse(uint8ArrayToString(base64urlDecode(payloadBase64)));
//         // check if the token is expired
//         if (payload.exp < Math.floor(Date.now() / 1000)) {
//             return false;
//         }
//         return true;
//     } catch {
//         return false;
//     }
// };
const utils_1 = require("./utils");
const validate_jwt = (secret, jwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [headerBase64, payloadBase64, signatureBase64] = jwt.split('.');
        if (!headerBase64 || !payloadBase64 || !signatureBase64) {
            throw new Error('Invalid token format');
        }
        // Step 1: Verify the signature
        const key = yield (0, utils_1.importKey)(secret);
        const data = (0, utils_1.stringToUint8Array)(`${headerBase64}.${payloadBase64}`);
        const signature = (0, utils_1.base64urlDecode)(signatureBase64);
        const validSignature = yield crypto.subtle.verify('HMAC', key, signature, data);
        if (!validSignature) {
            return false;
        }
        // verify claims
        const payload = JSON.parse((0, utils_1.uint8ArrayToString)((0, utils_1.base64urlDecode)(payloadBase64)));
        // check if the token is expired
        if (payload.exp < Math.floor(Date.now() / 1000)) {
            return false;
        }
        return true;
    }
    catch (error) {
        throw new Error(`Failed to validate JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
});
exports.validate_jwt = validate_jwt;
