import { Response } from "../../../../../../_metronic/helpers";

export interface Role {
  _id?: number;
  name?: string;
  slug?: string;
  permissions?: Permissions;
}

export interface Permissions {
  [key: string]: { [key: string]: boolean };
}

export type RolesQueryResponse = Response<Array<Role>>;
export type PermissionQueryResponse = Response<Permissions>;

export const initialRole: Role = {
  name: "",
  slug: "",
};
