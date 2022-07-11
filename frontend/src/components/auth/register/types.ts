import { AuthActionTypes } from "../store/types"

export interface IRegister {
    firstName: string,
    secondName: string,
    email: string,
    photo: string,
    phone: string,
    password: string,
    confirmPassword: string
}

export interface IRegisterRequest extends IRegister {
    RecaptchaToken: string
}

export interface RegisterSuccessAction {
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: string
}