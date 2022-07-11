export enum AuthActionTypes {
    LOGIN_AUTH = "AUTH/LOGIN_AUTH",
    REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS"
}

export interface IUser {
    email: string,
    image: string,
    roles: string
}
export interface AuthState {
    user?: IUser,
    isAuth: boolean
} 