import axios, { AxiosResponse } from "axios";
import {
  // ContactModel,
  SearchContactsQueryResponse,
} from "./_models";

const API_URL_V1 = import.meta.env.VITE_APP_API_V1_URL;

export const SEARCH_CONTACTS_URL = `${API_URL_V1}contact/search/query`;


export function searchContact(query: string) {
  return axios
    .get(`${SEARCH_CONTACTS_URL}?${query}`)
    .then(
      (response: AxiosResponse<SearchContactsQueryResponse>) => response.data
    );
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
