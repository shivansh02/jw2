"use strict";
// import { base64urlEncode, createHeader, importKey, sign, stringToUint8Array } from './utils';
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
exports.encode_jwt = void 0;
// export const encode_jwt = async (secret: string, id: string | number, payload: JwtPayload, ttl: number = 3600): Promise<string> => {
//     const header = JSON.stringify(createHeader());
//     const payloadWithExp = { ...payload, exp: Math.floor(Date.now() / 1000) + ttl };
//     const headerBase64 = base64urlEncode(stringToUint8Array(header));
//     const payloadBase64 = base64urlEncode(stringToUint8Array(JSON.stringify(payloadWithExp)));
//     const key = await importKey(secret);
//     const signatureBase64 = base64urlEncode(await sign(key, stringToUint8Array(`${headerBase64}.${payloadBase64}`)));
//     return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
// };
const utils_1 = require("./utils");
const encode_jwt = (secret_1, id_1, payload_1, ...args_1) => __awaiter(void 0, [secret_1, id_1, payload_1, ...args_1], void 0, function* (secret, id, payload, ttl = 3600) {
    try {
        const header = JSON.stringify((0, utils_1.createHeader)());
        const payloadWithExp = Object.assign(Object.assign({}, payload), { exp: Math.floor(Date.now() / 1000) + ttl });
        const headerBase64 = (0, utils_1.base64urlEncode)((0, utils_1.stringToUint8Array)(header));
        const payloadBase64 = (0, utils_1.base64urlEncode)((0, utils_1.stringToUint8Array)(JSON.stringify(payloadWithExp)));
        const key = yield (0, utils_1.importKey)(secret);
        const signatureBase64 = (0, utils_1.base64urlEncode)(yield (0, utils_1.sign)(key, (0, utils_1.stringToUint8Array)(`${headerBase64}.${payloadBase64}`)));
        return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
    }
    catch (error) {
        throw new Error(`Failed to encode JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
});
exports.encode_jwt = encode_jwt;
