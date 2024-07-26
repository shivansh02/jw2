import { JwtPayload } from './types';
export declare const encode_jwt: (secret: string, id: string | number, payload: JwtPayload, ttl?: number) => Promise<string>;
