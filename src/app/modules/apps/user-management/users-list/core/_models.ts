import { Response } from "../../../../../../_metronic/helpers";
import { Permissions, Role } from "../../../role-management/roles-list/core/_models";

export type AuthModel = {
  api_token: string;
  refreshToken?: string;
};
export type User = {
  _id?: number;
  name?: string;
  family?: string;
  full_name?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  role?: Role;
  permissions?: Permissions;
  camp?: string;
  categories?: Array<string>;
  files?: { total_file: number; total_file_size: number };
  otp?: { code: string; expire_at: number };
  pic?: {
    _id?: number;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    sizes?: {
      small: string; // Path to small version
      medium: string; // Path to medium version
      large: string; // Path to large version
    };
  };
  language?: "en" | "fa";
  auth?: AuthModel;
  status?: "pending" | "active" | "locked";
  deleted?: boolean;
};

export type PopulatedUser = {
  _id?: number;
  name?: string;
  family?: string;
  full_name?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  role?: Role;
  permissions?: Permissions;
  camp?: string;
  categories?: Array<string>;
  files?: { total_file: number; total_file_size: number };
  otp?: { code: string; expire_at: number };
  pic?: {
    _id?: number;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    sizes?: {
      small: string; // Path to small version
      medium: string; // Path to medium version
      large: string; // Path to large version
    };
  };
  language?: "en" | "fa";
  auth?: AuthModel;
  status?: "pending" | "active" | "locked";
  deleted?: boolean;
};

export type UsersQueryResponse = Response<Array<PopulatedUser>>;

export const initialUser: PopulatedUser = {
  name: "",
  family: "",
  status: "active",
};
