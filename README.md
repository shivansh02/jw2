# JW2 - A Lightweight JWT Library that runs on the edge.

JW2 is a type-safe library for encoding, decoding, and validating JSON Web Tokens (JWTs). Unlike the original jsonwebtoken package, JW2 supports edge runtime, allowing it to be used in middleware. It achieves this by using Web Crypto API instead of a library like crypto.

## Features

- Encode JWTs with custom payloads and expiration times
- Decode JWTs and validate their signatures
- Validate JWTs for expiration and signature integrity
- Built with TypeScript for enhanced type safety
- No dependencies on other JWT libraries
- Uses Web Crypto API for cryptographic operations

## Installation instructions

```bash
cd jw2
npm install
sudo npm link
cd ../jw2-demo
npm install
npm link jw2
````
npm link creates a syslink in the global folder, allowing you to use the package in other projects.



## Demo App
Create a .env.local file in the root directory and add your JWT secret:

JWT_SECRET=your_secret_key

Run the development server:
npm run dev

Open http://localhost:3000 in your browser.

Visit the login page at /login to generate a JWT.

The JWT will be stored in a cookie.

Visit the protected page at /protected to see the JWT validation in action.

You can also make a GET request to /api/protecter with the JWT in the Authorization header to test the protected API route.



## Project Structure

middleware.ts: JWT validation middleware

app/login/page.tsx: Login page that generates and saves JWT to a cookie

app/protected/page.tsx: Protected page that requires a valid JWT to access

app/api/generate-jwt/route.ts: API route for generating JWTs

app/api/protecter/route.ts: Protected API route that requires JWT authentication
