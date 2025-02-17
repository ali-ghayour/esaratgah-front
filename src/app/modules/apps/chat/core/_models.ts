import { Response } from "../../../../../_metronic/helpers";
export interface Contact {
  _id: number;
  name: string;
  family: string;
  phone_number: string;
  full_name: string;
  pic: {
    sizes: {
      small: string;
      medium: string;
      large: string;
    };
  };
}
export interface FriendRequest {
  _id: number;
  sender: {
    _id: number;
    full_name: string;
    pic: {
      sizes: {
        small: string;
      };
    };
    phone_number: string;
  };
  createdAt: string;
}

export type ContactsQueryResponse = Response<Array<Contact>>;
export type FriendRequestQueryResponse = Response<Array<FriendRequest>>;
