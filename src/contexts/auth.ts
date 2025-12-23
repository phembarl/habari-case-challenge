import { createContext } from 'react';
import { type AuthContextType } from '../models';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);