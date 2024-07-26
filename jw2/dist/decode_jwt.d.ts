import { JwtPayload } from './types';
export declare const decode_jwt: (secret: string, jwt: string) => Promise<{
    id: string;
    payload: JwtPayload;
    expires_at: Date;
}>;
