import axios, { AxiosResponse } from "axios";
import { AuthModel, RequestOtpResponse, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_BACKOFFICE_V1_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
export const REQUEST_OTP_URL = `${API_URL}/request_otp`;

// Server should return AuthModel
export function login(phone_number: string, code: string | null) {
  return axios.post<AuthModel>(LOGIN_URL, {
    phone_number,
    code,
  });
  // .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
}

export function request_otp(phone_number: string) {
  return axios
    .post(REQUEST_OTP_URL, { phone_number })
    .then((response: AxiosResponse<RequestOtpResponse>) => response.data);
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}

export function logoutUser(token:string){
  return axios.post<{message:string}>(LOGOUT_URL,{
    api_token:token
  })
}