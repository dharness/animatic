import { User } from "@supabase/supabase-js";

declare module "express-serve-static-core" {
  export interface Request {
    user?: User;
  }
}
