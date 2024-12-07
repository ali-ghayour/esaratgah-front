import { Response } from "../../../../../../_metronic/helpers";

export type AuthModel = {
  api_token: string;
  refreshToken?: string;
};
export type User = {
  _id?: number;
  name?: string;
  familly?: string;
  username?: string;
  phone_number?: string;
  password?: string;
  role?: number[];
  permissions?: number[];
  camp?: string;
  categories?: Array<string>;
  files?: { total_file: number; total_file_size: number };
  otp?: { code: string; expire_at: number };
  pic?: number | string;
  language?: "en" | "fa";
  auth?: AuthModel;
  status: "pending" | "active" | "locked";
  deleted?: boolean;
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUser: User = {
  pic: "avatars/300-6.jpg",
  name: "",
  familly: "",
  status : "active"
};
