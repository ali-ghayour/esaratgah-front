import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../_metronic/helpers";
import { File, FilesQueryResponse, TotalFileInfoResponse } from "./_models";

type BrowserFile = globalThis.File;

const API_URL = import.meta.env.VITE_APP_BACKOFFICE_V1_API_URL;
const FILE_URL = `${API_URL}/file`;
const GET_USERS_URL = `${API_URL}/files/query`;

const getFiles = (query: string): Promise<FilesQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<FilesQueryResponse>) => d.data);
};

const getFileById = (id: ID): Promise<File | undefined> => {
  return axios
    .get(`${FILE_URL}/${id}`)
    .then((response: AxiosResponse<Response<File>>) => response.data)
    .then((response: Response<File>) => response.data);
};

const uploadFile = (files: BrowserFile[]): Promise<void> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });
  return axios
    .post(FILE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(() => {});
};

const getTotalFileInfo = (): Promise<TotalFileInfoResponse> => {
  return axios
    .get(`${FILE_URL}`)
    .then((d: AxiosResponse<TotalFileInfoResponse>) => d.data);
};

// const updateUser = (user: User): Promise<User | undefined> => {
//   return axios
//     .put(`${USER_URL}/${user._id}`, user)
//     .then((response: AxiosResponse<Response<User>>) => response.data)
//     .then((response: Response<User>) => response.data);
// };

const deleteFile = (fileId: ID): Promise<void> => {
  return axios.delete(`${FILE_URL}/${fileId}`).then(() => {});
};
// const deleteSelectedFiles = async (selected: string[]) => {
//   const response = await axios.post(`/delete-files`, { files: selected });
//   if (response.status !== 200) {
//     throw new Error("Failed to delete files");
//   }
//   return response.data; // Mutation response
// };

const deleteSelectedFiles = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${FILE_URL}/${id}`));
  return axios.all(requests).then(() => {});
};

export {
  getFiles,
  deleteFile,
  deleteSelectedFiles,
  getFileById,
  uploadFile,
  getTotalFileInfo,
  //   updateUser,
};
