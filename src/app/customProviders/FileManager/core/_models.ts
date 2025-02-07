import { Response } from "../../../../_metronic/helpers";

export type File = {
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
  created_by?: number;
};

export type FilesQueryResponse = Response<Array<File>>;
export type TotalFileInfoResponse = Response<{ totalFiles: number; totalSize :number}>;

export const initialUser: File = {
  originalName: "blank",
  fileName: "blank",
  mimeType: "jpg",
  size: 0,
};
