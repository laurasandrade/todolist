import { Scope } from "./scope";

export interface Group {
  scopes: Array<Scope>;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}
