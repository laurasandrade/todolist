import { Branch } from './branch';

export interface User {
  user: string;
  password: string;
  name: string;
  branches: Array<Branch>;
  group: string;
  scopes: Array<string>;
  isAdmin: boolean;
  hasPermission(scope: string): boolean;

}
