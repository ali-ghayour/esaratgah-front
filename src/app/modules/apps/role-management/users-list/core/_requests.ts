import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Role, RolesQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_BACKOFFICE_V1_API_URL;
const ROLE_URL = `${API_URL}/role`;
const GET_ROLES_URL = `${API_URL}/roles/query`;

const getRoles = (query: string): Promise<RolesQueryResponse> => {
  return axios
    .get(`${GET_ROLES_URL}?${query}`)
    .then((d: AxiosResponse<RolesQueryResponse>) => d.data);
};

const getRoleById = (id: ID): Promise<Role | undefined> => {
  return axios
    .get(`${ROLE_URL}/${id}`)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data);
};

const createRole = (role: Role): Promise<Role | undefined> => {
  return axios
    .put(ROLE_URL, role)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data);
};

const updateRole = (role: Role): Promise<Role | undefined> => {
  return axios
    .post(`${ROLE_URL}/${role._id}`, role)
    .then((response: AxiosResponse<Response<Role>>) => response.data)
    .then((response: Response<Role>) => response.data);
};

const deleteRole = (roleId: ID): Promise<void> => {
  return axios.delete(`${ROLE_URL}/${roleId}`).then(() => {});
};

const deleteSelectedRoles = (roleId: Array<ID>): Promise<void> => {
  const requests = roleId.map((id) => axios.delete(`${ROLE_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getRoles,
  deleteRole,
  deleteSelectedRoles,
  getRoleById,
  createRole,
  updateRole,
};
