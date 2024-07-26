export interface JwtPayload {
    [key: string]: any;
    exp: number;
    sub?: string | number;
}
