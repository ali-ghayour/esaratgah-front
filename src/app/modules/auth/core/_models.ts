import { Response } from "../../../../_metronic/helpers";
import { Role } from "../../apps/role-management/roles-list/core/_models";
export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface UserModel {
  _id: number;
  name: string;
  family: string;
  username: string;
  phone_number: string;
  password: string;
  role: Role;
  permissions: {
    [key: string]: {
      read: boolean;
      write: boolean;
      create: boolean;
      delete: boolean;
    };
  };
  camp: string;
  categories: Array<string>;
  files: { total_file: number; total_file_size: number };
  otp: { code: string; expire_at: number };
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  auth?: AuthModel;
}

export type RequestOtpResponse = Response<{sent_code:boolean}>;
