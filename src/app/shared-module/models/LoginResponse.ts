import { User } from './User';

export interface LoginResponse {
    code: number;
    status: boolean;
    message: string;
    data: User;
  }
