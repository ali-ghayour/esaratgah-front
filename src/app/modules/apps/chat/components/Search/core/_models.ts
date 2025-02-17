import { Response } from "../../../../../../../_metronic/helpers";
export interface SearchContact {
  _id: number;
  name: string;
  family: string;
  full_name: string;
  pic: {
    sizes: {
      small: string;
      medium: string;
      large: string;
    };
  };
  is_friend: boolean;
  friend_request_sent : boolean;
}

export type SearchContactsQueryResponse = Response<Array<SearchContact>>;
