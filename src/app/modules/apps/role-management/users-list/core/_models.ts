import { Response } from "../../../../../../_metronic/helpers";

export interface Role{
  _id?: number;
  name: string;
  slug: string;
  permissions?: number[];
}

export type RolesQueryResponse = Response<Array<Role>>;

export const initialRole: Role = {
  name: "",
  slug: ""
};
