import type{ Request } from 'express';
import type{ JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

// Extend the default JwtPayload with your custom properties
export interface JwtPayload extends DefaultJwtPayload {
  userId: number;
  email: string;
}

export interface AuthRequest extends Request {
  userId?: number;
}

export interface AuthInput {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}
