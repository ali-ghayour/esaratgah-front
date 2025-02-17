import axios, { AxiosResponse } from "axios";
import {
  // ContactModel,
  ContactsQueryResponse,
  FriendRequestQueryResponse,
} from "./_models";

const API_URL_V1 = import.meta.env.VITE_APP_API_V1_URL;

export const GET_CONTACTS_URL = `${API_URL_V1}contact/query`;
export const SEARCH_CONTACTS_URL = `${API_URL_V1}contact/search/query`;
export const FRIEND_REQUESTS_URL = `${API_URL_V1}contact/friend-request`;
// export const FRIEND_REQUESTS_LIST_URL = `${API_URL_V1}contact/friend-requests`;
// export const CHANGE_FRIEND_REQUESTS_STATUS_URL = `${API_URL_V1}contact/friend-requests`;

// Server should return contacts
export const getContacts = (): Promise<ContactsQueryResponse> => {
  return axios
    .get(`${GET_CONTACTS_URL}`)
    .then((d: AxiosResponse<ContactsQueryResponse>) => d.data);
};

export function searchNewContact(query: string) {
  return axios
    .get(`${SEARCH_CONTACTS_URL}?${query}`)
    .then((response: AxiosResponse<ContactsQueryResponse>) => response.data);
}

export function addFriend(recipientId: string) {
  return axios.post<{ message: string }>(FRIEND_REQUESTS_URL, {
    recipientId,
  });
}

export function getFriendRequests() {
  return axios
    .get(FRIEND_REQUESTS_URL)
    .then(
      (response: AxiosResponse<FriendRequestQueryResponse>) => response.data
    );
}

export function changeFriendRequestStatus(_id: number, status: string) {
  return axios.put<{ message: string }>(FRIEND_REQUESTS_URL, {
    _id,
    status,
  });
}

// // Server should return AuthModel
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     email,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   });
// }

// // Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//     email,
//   });
// }

// export function getUserByToken(token: string) {
//   return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
//     api_token: token,
//   });
// }

// export function logoutUser(token: string) {
//   return axios.post<{ message: string }>(LOGOUT_URL, {
//     api_token: token,
//   });
// }
