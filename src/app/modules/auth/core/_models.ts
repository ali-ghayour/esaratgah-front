import { Response } from "../../../../_metronic/helpers";
export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface UserModel {
  _id: number;
  name: string;
  familly: string;
  username: string;
  phone_number: string;
  password: string;
  role: number[];
  permissions: number[];
  camp: string;
  categories: Array<string>;
  files: { total_file: number; total_file_size: number };
  otp: { code: string; expire_at: number };
  pic?: string;
  language?: "en" | "de" | "es" | "fr" | "ja" | "zh" | "ru";
  auth?: AuthModel;
}

export type RequestOtpResponse = Response<{sent_code:boolean}>;
